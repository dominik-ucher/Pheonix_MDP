import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


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
      const insertQuery = "INSERT INTO applications (user_id, job_id, answer1, answer2, answer3, status) VALUES (?, ?, ?, ?, ?, 'pending')";
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

    // Update the application status to "rejected"
    const updateQuery = "UPDATE applications SET status = 'rejected' WHERE id = ?";
    db.query(updateQuery, [applicationId], (err, result) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json({ message: "Application withdrawn successfully." });
    });
  });
};