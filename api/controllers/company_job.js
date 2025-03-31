import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Client } from '@elastic/elasticsearch';

//Company job management 

const esClient = new Client({
  node: 'http://localhost:9200', // Elasticsearch server URL
})


export const postJob = (req, res) => {
  const { companyId, title, location, start_date, employmentType, deadline, salary, description, requirements } = req.body;

  if (!companyId || !title || !location || !start_date || !employmentType || !deadline || !salary || !description || !requirements) {
    return res.status(400).json("All fields are required.");
  }

  // Allowed employment types
  const validEmploymentTypes = ["full-time", "part-time", "contract", "internship", "freelance"];

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
export const initiateApplication = (req, res) => {
  const { companyId, jobId, professionalId } = req.body;

  if (!companyId || !jobId || !professionalId) {
    return res.status(400).json("Company ID, Job ID, and Professional ID are required.");
  }

  // Check if the company exists
  const companyQuery = "SELECT * FROM companies WHERE id = ?";
  db.query(companyQuery, [companyId], (err, companyData) => {
    if (err) return res.status(500).json(err);
    if (companyData.length === 0) return res.status(404).json("Company not found.");

    // Check if the job exists, belongs to the company, and retrieve its application deadline
    const jobQuery = "SELECT application_deadline FROM jobs WHERE id = ? AND company_id = ?";
    db.query(jobQuery, [jobId, companyId], (err, jobData) => {
      if (err) return res.status(500).json(err);
      if (jobData.length === 0) return res.status(404).json("Job not found or does not belong to this company.");

      // Get today's date in YYYY-MM-DD format
      const today = new Date().toISOString().split("T")[0];

      if (jobData[0].application_deadline < today) {
        return res.status(400).json("Application deadline has passed.");
      }

      // Check if the professional exists
      const professionalQuery = "SELECT * FROM professionals WHERE id = ?";
      db.query(professionalQuery, [professionalId], (err, professionalData) => {
        if (err) return res.status(500).json(err);
        if (professionalData.length === 0) return res.status(404).json("Professional not found.");

        // Insert a new application
        const insertQuery = "INSERT INTO applications (user_id, job_id, status) VALUES (?, ?, 'pending')";
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
};


export const updateApplicationStatus = (req, res) => {
  const { applicationId } = req.params;
  const { newStatus } = req.body;

  if (!applicationId || !newStatus) {
    return res.status(400).json("Application ID and new status are required.");
  }

  // Allowed statuses
  const validStatuses = ["pending", "rejected", "accepted"];

  if (!validStatuses.includes(newStatus)) {
    return res.status(400).json("Invalid status. Allowed values: pending, rejected, accepted.");
  }

  // Update application status
  const query = "UPDATE applications SET status = ? WHERE id = ?";
  db.query(query, [newStatus, applicationId], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.affectedRows === 0) return res.status(404).json("Application not found.");

    return res.status(200).json({ message: `Application status updated to ${newStatus}.` });
  });
};
