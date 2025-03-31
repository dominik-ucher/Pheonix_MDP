import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// PROFESSIONALS
// (1) UPDSATE PERSONAL PROFILE
// (2) APPLY TO A JOB - STATUS OF (APPLICATION) SET TO "IN PROGRESS" 
// (3) GET APPLICATION STATUS
// (4) REFUSE A JOB PROPOSAL - WITHDRAW FROM APPLICATION
//  APPLICABLE BOTH WHEN A COMPANY SENDS AN INVITE OR AFTER ACCEPTING INVITE
// (5) ACCEPT INVITE FROM COMPANY 
// (6) ACCEPT JOB WHEN OFFER FROM THE COMPANY AVAILABLE, IF ABLE TO 




// POSSIBLE APPLICATION STATUS "REQUESTED" , "IN PROGRESS" , "WITHDRAWN" ,"OFFER", "REJECTED", "ACCEPTED"
//REQUESTED - COMPANY SENT AN INVITE
//WITHDRAWN - THE PROFFESIONAL REFUSES AT ANY POINT
//REJECTED/OFFER - THE COMPANY CHANGES STATUS WHEN THE APPLICATION IS IN PROGRESS
//ACCEPTED - PROFESSIONAL ACCEPTS OFFER

//1
export const updateProfile = (req, res) => {
  const { first_name, last_name, birthdate, email, address, phone_number, link_to_cv } = req.body;
  const { professionalId } = req.params;

  // Validate input data
  if (!first_name || !last_name || !birthdate || !email || !address || !phone_number || !link_to_cv) {
    return res.status(400).json("All fields are required.");
  }

  // Validate date format (YYYY-MM-DD)
  const isValidDate = (date) => !isNaN(Date.parse(date)) && /^\d{4}-\d{2}-\d{2}$/.test(date);
  if (!isValidDate(birthdate)) {
    return res.status(400).json("Invalid birthdate format. Use YYYY-MM-DD.");
  }

  // Validate email format
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json("Invalid email format.");
  }

  // Check if email already exists for another user
  const checkQuery = "SELECT * FROM professionals WHERE email = ? AND id != ?";
  db.query(checkQuery, [email, professionalId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("Email is already taken by another user.");

    // Update professional details in the table
    const updateQuery = "UPDATE professionals SET first_name = ?, last_name = ?, birthdate = ?, email = ?, address = ?, phone_number = ?, link_to_cv = ? WHERE id = ?";
    const values = [first_name, last_name, birthdate, email, address, phone_number, link_to_cv, professionalId];

    db.query(updateQuery, values, (err, result) => {
      if (err) return res.status(500).json(err);
      if (result.affectedRows === 0) return res.status(404).json("User not found.");

      return res.status(200).json("Profile updated successfully.");
    });
  });
};
//2
export const applyToJob = (req, res) => {
  const { userId, jobId, answer1, answer2, answer3 } = req.body;

  if (!userId || !jobId || !answer1 || !answer2 || !answer3) {
    return res.status(400).json("All fields are required.");
  }

  // Check if user already applied
  const checkQuery = "SELECT * FROM applications WHERE user_id = ? AND job_id = ?";
  db.query(checkQuery, [userId, jobId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("You have already applied to this job.");

    // Retrieve application deadline
    const jobQuery = "SELECT application_deadline FROM jobs WHERE id = ?";
    db.query(jobQuery, [jobId], (err, jobData) => {
      if (err) return res.status(500).json(err);
      if (jobData.length === 0) return res.status(404).json("Job not found.");

      // Get today's date in YYYY-MM-DD format
      const today = new Date().toISOString().split("T")[0];

      if (jobData[0].application_deadline < today) {
        return res.status(400).json("Application deadline has passed.");
      }

      // Insert new application (id auto-increments)
      const insertQuery = "INSERT INTO applications (user_id, job_id, answer1, answer2, answer3, status) VALUES (?, ?, ?, ?, ?, 'IN PROGRESS')";
      db.query(insertQuery, [userId, jobId, answer1, answer2, answer3], (err, result) => {
        if (err) return res.status(500).json(err);

        // Return the newly created application ID
        return res.status(200).json({ 
          message: "Application submitted successfully.",
          applicationId: result.insertId 
        });
      });
    });
  });
};

//3
export const getApplicationStatus = (req, res) => {
  const { applicationId, professionalId } = req.params;

  if (!applicationId || !professionalId) {
    return res.status(400).json("Application ID and Professional ID are required.");
  }

  const query = "SELECT status FROM applications WHERE id = ? AND user_id = ?";
  db.query(query, [applicationId, professionalId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("Application not found or access denied.");

    return res.status(200).json({ status: data[0].status });
  });
};

//4 
export const withdrawApplication = (req, res) => {
  const { applicationId, professionalId } = req.params;

  if (!applicationId || !professionalId) {
    return res.status(400).json("Application ID and Professional ID are required.");
  }

  // Check if the application exists and belongs to the professional
  const checkQuery = "SELECT * FROM applications WHERE id = ? AND user_id = ?";
  db.query(checkQuery, [applicationId, professionalId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("Application not found or access denied.");

    // Check if the application status is either "REQUESTED", "IN PROGRESS", or "ACCEPTED"
    const currentStatus = data[0].status;
    const validStatuses = ["REQUESTED", "IN PROGRESS","OFFER", "ACCEPTED"];

    if (!validStatuses.includes(currentStatus)) {
      return res.status(400).json(`Application cannot be withdrawn. Current status: ${currentStatus}`);
    }

    // Update the application status to "WITHDRAWN"
    const updateQuery = "UPDATE applications SET status = 'WITHDRAWN' WHERE id = ?";
    db.query(updateQuery, [applicationId], (err, result) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json({ message: "Application withdrawn successfully." });
    });
  });
};
//5 
export const acceptInvite = (req, res) => {
  const { applicationId, professionalId } = req.params;

  if (!applicationId || !professionalId) {
    return res.status(400).json("Application ID and Professional ID are required.");
  }

  const checkQuery = "SELECT status FROM applications WHERE id = ? AND user_id = ?";
  db.query(checkQuery, [applicationId, professionalId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("Application not found or access denied.");

    // If the status is "REQUESTED", update it to "IN PROGRESS"
    if (data[0].status === 'REQUESTED') {
      const updateQuery = "UPDATE applications SET status = 'IN PROGRESS' WHERE id = ?";
      db.query(updateQuery, [applicationId], (err, result) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Application status updated to 'IN PROGRESS'.");
      });
    } else {
      return res.status(400).json("Application status is not 'REQUESTED'.");
    }
  });
};

//6 ACCEPT JOB WHEN STATUS IS "OFFER"
export const acceptJobOffer = (req, res) => {
  const { applicationId, professionalId } = req.params;

  if (!applicationId || !professionalId) {
    return res.status(400).json("Application ID and Professional ID are required.");
  }

  // Check if the application exists and belongs to the professional
  const checkQuery = "SELECT * FROM applications WHERE id = ? AND user_id = ?";
  db.query(checkQuery, [applicationId, professionalId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("Application not found or access denied.");

    // Retrieve job type for the current application
    const jobId = data[0].job_id;

    // Check the job type (full-time, part-time) from the jobs table
    const jobQuery = "SELECT employment_type FROM jobs WHERE id = ?";
    db.query(jobQuery, [jobId], (err, jobData) => {
      if (err) return res.status(500).json(err);
      if (jobData.length === 0) return res.status(404).json("Job not found.");

      const jobType = jobData[0].employment_type;

      // Check if the user already has an accepted job (full-time or part-time)
      let statusCheckQuery;
      if (jobType === "Full-time") {
        // For Full-time, NO OTHER OFFERS ACCEPTED
        statusCheckQuery = "SELECT * FROM applications WHERE user_id = ? AND status = 'ACCEPTED' AND job_id != ?;";

      } else {
        // For Part-Time, NO OTHER FULL TIME ACCEPTED, NO MORE THAN 1 PART TIME ACCEPTED
        statusCheckQuery = "SELECT * FROM applications WHERE user_id = ? AND status = 'ACCEPTED' AND (job_id != ? AND (employment_type = 'Full-time' OR (employment_type = 'Part-time' AND job_id != ?)))";

      }

      db.query(statusCheckQuery, [professionalId, jobId], (err, existingData) => {
        if (err) return res.status(500).json(err);
        if (existingData.length > 0) {
          return res.status(400).json("You already have another accepted job that conflicts with this one.");
        }

        // Check if the application status is "OFFER"
        const currentStatus = data[0].status;
        if (currentStatus !== "OFFER") {
          return res.status(400).json(`Job offer cannot be accepted. Current status: ${currentStatus}`);
        }

        // Update the application status to "ACCEPTED"
        const updateQuery = "UPDATE applications SET status = 'ACCEPTED' WHERE id = ?";
        db.query(updateQuery, [applicationId], (err, result) => {
          if (err) return res.status(500).json(err);

          return res.status(200).json({ message: "Job offer accepted successfully." });
        });
      });
    });
  });
};
