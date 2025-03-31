import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//Retrieve professional_id and job_id that it reffers to by application status, for all positions
export const getApplicationsByStatusForCompany = (req, res) => {
  const { companyId, status } = req.params;

  // Validate required parameters
  if (!companyId || !status) {
    return res.status(400).json("Company ID and status are required.");
  }

  // Validate status
  const validStatuses = ["REQUESTED", "IN PROGRESS", "ACCEPTED", "REJECTED", "WITHDRAWN"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json(`Invalid status. Allowed values are: ${validStatuses.join(', ')}`);
  }

  // SQL query to retrieve professional_ids and job_ids based on company_id and status
  const query = `
    SELECT a.professional_id, a.job_id
    FROM applications a
    JOIN jobs j ON a.job_id = j.id
    WHERE j.company_id = ? AND a.status = ?`;

  db.query(query, [companyId, status], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });

    // If no results are found
    if (results.length === 0) {
      return res.status(404).json(`No applications found with status ${status} for this company.`);
    }

    // Return the results with professional_id and job_id
    return res.status(200).json(results);
  });
};


//Retrieve professional_id by application status, for a given position (job_id)

export const getProfessionalByJobStatus = (req, res) => {
  const { companyId, jobId, status } = req.params;

  // Validate required parameters
  if (!companyId || !jobId || !status) {
    return res.status(400).json("Company ID, Job ID, and status are required.");
  }

  // Validate status
  const validStatuses = ["REQUESTED", "IN PROGRESS", "ACCEPTED", "REJECTED", "WITHDRAWN"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json(`Invalid status. Allowed values are: ${validStatuses.join(', ')}`);
  }

  // SQL query to retrieve professional_ids based on job_id and status
  const query = `
    SELECT a.professional_id
    FROM applications a
    JOIN jobs j ON a.job_id = j.id
    WHERE j.company_id = ? AND a.job_id = ? AND a.status = ?`;

  db.query(query, [companyId, jobId, status], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });

    // If no results are found
    if (results.length === 0) {
      return res.status(404).json(`No applications found for the job with ID ${jobId} and status ${status}.`);
    }

    // Return the results as an array of professional_ids
    const professionalIds = results.map(row => row.professional_id);
    return res.status(200).json({ professionalIds });
  });
};
