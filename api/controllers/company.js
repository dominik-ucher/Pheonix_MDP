import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// (1) EDIT PROFILE
// (2) POST JOB
// (3) UPDATE JOB
// (4) DELETE JOB
// (5) INITIATE APPLICATION - SEND REQUEST TO PROFESSIONAL (INVITE HIM TO APPLY) STATUS SET TO REQUESTED
// (6)  UPDATE APPLICATION STATUS - FROM IN PROGRESS TO REJECTED/OFFER


// POSSIBLE APPLICATION STATUS "REQUESTED" , "IN PROGRESS" , "WITHDRAWN" ,"OFFER", "REJECTED", "ACCEPTED"
//REQUESTED - COMPANY SENT AN INVITE
//WITHDRAWN - THE PROFFESIONAL REFUSES AT ANY POINT
//REJECTED/OFFER - THE COMPANY CHANGES STATUS WHEN THE APPLICATION IS IN PROGRESS
//ACCEPTED - PROFESSIONAL ACCEPTS OFFER

//1
export const editCompanyProfile = (req, res) => {
  const { companyId, name, description, location, website, contact_email } = req.body;

  // Ensure that at least one field to update is provided
  if (!companyId || !name || !description || !location || !website || !contact_email) {
    return res.status(400).json("All fields (name, description, location, website, contact_email) are required.");
  }

  // Validate email format
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailRegex.test(contact_email)) {
    return res.status(400).json("Invalid email format.");
  }

  // Check if the company exists
  const checkCompanyQuery = "SELECT * FROM companies WHERE id = ?";
  db.query(checkCompanyQuery, [companyId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("Company not found.");

    // Update company profile
    const updateQuery = `
      UPDATE companies 
      SET name = ?, description = ?, location = ?, website = ?, contact_email = ? 
      WHERE id = ?
    `;
    db.query(updateQuery, [name, description, location, website, contact_email, companyId], (err, result) => {
      if (err) return res.status(500).json(err);
      if (result.affectedRows === 0) return res.status(404).json("No changes made or company not found.");

      return res.status(200).json({
        message: "Company profile updated successfully."
      });
    });
  });
};

//2
export const postJob = (req, res) => {
  const { companyId, title, location, start_date, employmentType, deadline, salary, description, requirements } = req.body;

  if (!companyId || !title || !location || !start_date || !employmentType || !deadline || !salary || !description || !requirements) {
    return res.status(400).json("All fields are required.");
  }

  // Allowed employment types
  const validEmploymentTypes = ["Full-time", "Part-time"];

  if (!validEmploymentTypes.includes(employmentType)) {
    return res.status(400).json(`Invalid employment type. Allowed values: ${validEmploymentTypes.join(", ")}`);
  }

  // Validate date format (YYYY-MM-DD)
  const isValidDate = (date) => !isNaN(Date.parse(date));
  if (!isValidDate(start_date) || !isValidDate(deadline)) {
    return res.status(400).json("Invalid date format. Use YYYY-MM-DD.");
  }

  // Check if company exists
  const checkQuery = "SELECT * FROM companies WHERE id = ?";
  db.query(checkQuery, [companyId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("Company not found.");

    // Insert job into jobs table
    const insertQuery = "INSERT INTO jobs (company_id, title, description, location, salary, requirements, employment_type, start_date, application_deadline) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(insertQuery, [companyId, title, description, location, salary, requirements, employmentType, start_date, deadline], (err, result) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json({
        message: "Job posted successfully.",
        jobId: result.insertId
      });
    });
  });
};

//3
export const updateJob = (req, res) => {
  const { jobId, companyId, title, location, start_date, employmentType, deadline, salary, description, requirements } = req.body;

  if (!jobId || !companyId || !title || !location || !start_date || !employmentType || !deadline || !salary || !description || !requirements) {
    return res.status(400).json("All fields are required.");
  }

  // Allowed employment types
  const validEmploymentTypes = ["Full-time", "Part-time"];

  if (!validEmploymentTypes.includes(employmentType)) {
    return res.status(400).json(`Invalid employment type. Allowed values: ${validEmploymentTypes.join(", ")}`);
  }

  // Validate date format (YYYY-MM-DD)
  const isValidDate = (date) => !isNaN(Date.parse(date));
  if (!isValidDate(start_date) || !isValidDate(deadline)) {
    return res.status(400).json("Invalid date format. Use YYYY-MM-DD.");
  }

  // Check if the job exists and if it belongs to the company
  const checkJobQuery = "SELECT * FROM jobs WHERE id = ? AND company_id = ?";
  db.query(checkJobQuery, [jobId, companyId], (err, jobData) => {
    if (err) return res.status(500).json(err);
    if (jobData.length === 0) return res.status(404).json("Job not found or does not belong to this company.");

    // Update job in the jobs table
    const updateQuery = `
      UPDATE jobs 
      SET title = ?, description = ?, location = ?, salary = ?, requirements = ?, employment_type = ?, start_date = ?, application_deadline = ? 
      WHERE id = ? AND company_id = ?
    `;
    db.query(updateQuery, [title, description, location, salary, requirements, employmentType, start_date, deadline, jobId, companyId], (err, result) => {
      if (err) return res.status(500).json(err);
      if (result.affectedRows === 0) return res.status(404).json("Job not updated or does not belong to this company.");

      return res.status(200).json({
        message: "Job updated successfully."
      });
    });
  });
};

//4
export const deleteJob = (req, res) => {
  const { jobId, companyId } = req.params;

  if (!jobId || !companyId) {
    return res.status(400).json("Job ID and Company ID are required.");
  }

  // Check if the job exists and if it belongs to the company
  const checkJobQuery = "SELECT * FROM jobs WHERE id = ? AND company_id = ?";
  db.query(checkJobQuery, [jobId, companyId], (err, jobData) => {
    if (err) return res.status(500).json(err);
    if (jobData.length === 0) return res.status(404).json("Job not found or does not belong to this company.");

    // Delete the job from the jobs table
    const deleteQuery = "DELETE FROM jobs WHERE id = ? AND company_id = ?";
    db.query(deleteQuery, [jobId, companyId], (err, result) => {
      if (err) return res.status(500).json(err);
      if (result.affectedRows === 0) return res.status(404).json("Job not deleted.");

      return res.status(200).json({
        message: "Job deleted successfully."
      });
    });
  });
};


//5
export const initiateApplication = (req, res) => {
  const { companyId, jobId, professionalId } = req.body;

  if (!companyId || !jobId || !professionalId) {
    return res.status(400).json("Company ID, Job ID, and Professional ID are required.");
  }

  const companyQuery = "SELECT * FROM companies WHERE id = ?";
  db.query(companyQuery, [companyId], (err, companyData) => {
    if (err) return res.status(500).json(err);
    if (companyData.length === 0) return res.status(404).json("Company not found.");

    const jobQuery = "SELECT application_deadline FROM jobs WHERE id = ? AND company_id = ?";
    db.query(jobQuery, [jobId, companyId], (err, jobData) => {
      if (err) return res.status(500).json(err);
      if (jobData.length === 0) return res.status(404).json("Job not found or does not belong to this company.");

      const today = new Date().toISOString().split("T")[0];
      if (jobData[0].application_deadline < today) {
        return res.status(400).json("Application deadline has passed.");
      }

      const applicationCheckQuery = "SELECT * FROM applications WHERE professional_id = ? AND job_id = ?";
      db.query(applicationCheckQuery, [professionalId, jobId], (err, existingApplication) => {
        if (err) return res.status(500).json(err);
        if (existingApplication.length > 0) return res.status(409).json("Application already exists for this job.");

        const professionalQuery = "SELECT * FROM professionals WHERE user_id = ?";
        db.query(professionalQuery, [professionalId], (err, professionalData) => {
          if (err) return res.status(500).json(err);
          if (professionalData.length === 0) return res.status(404).json("Professional not found.");

          const insertQuery = "INSERT INTO applications (professional_id, job_id, status) VALUES (?, ?, 'REQUESTED')";
          db.query(insertQuery, [professionalId, jobId], (err, result) => {
            if (err) return res.status(500).json(err);

            return res.status(200).json({
              message: "Application initiated successfully.",
              applicationId: result.insertId
            });
          });
        });
      });
    });
  });
};

// 6
export const updateApplicationStatus = (req, res) => {
  const { applicationId } = req.params;
  const { newStatus } = req.body;

  if (!applicationId || !newStatus) {
    return res.status(400).json("Application ID and new status are required.");
  }

  // Allowed statuses
  const validStatuses = ["OFFER", "REJECTED"];

  if (!validStatuses.includes(newStatus)) {
    return res.status(400).json("Invalid status. Allowed values: OFFER, REJECTED.");
  }

  // Check if the current status is "IN PROGRESS"
  const checkQuery = "SELECT status FROM applications WHERE id = ?";
  db.query(checkQuery, [applicationId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("Application not found.");

    if (data[0].status !== "IN PROGRESS") {
      return res.status(400).json("Application must be in 'IN PROGRESS' status to update.");
    }

    // Update application status
    const query = "UPDATE applications SET status = ? WHERE id = ?";
    db.query(query, [newStatus, applicationId], (err, result) => {
      if (err) return res.status(500).json(err);
      if (result.affectedRows === 0) return res.status(404).json("Application not found.");

      return res.status(200).json({ message: `Application status updated to ${newStatus}.` });
    });
  });
};

