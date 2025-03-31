import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//RETRIEVE ALL JOBS BY STATUS

export const getJobsByStatusForUser = (req, res) => {
    const { userId, status } = req.params;
  
    // Validate required parameters
    if (!userId || !status) {
      return res.status(400).json("User ID and status are required.");
    }
  
    // Validate status
    const validStatuses = ["REQUESTED", "IN PROGRESS", "ACCEPTED", "REJECTED", "WITHDRAWN"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json(`Invalid status. Allowed values are: ${validStatuses.join(', ')}`);
    }
  
    // SQL query to retrieve job_ids and professional_ids based on user_id and status
    const query = `
      SELECT a.job_id, a.professional_id
      FROM applications a
      WHERE a.user_id = ? AND a.status = ?`;
  
    db.query(query, [userId, status], (err, results) => {
      if (err) return res.status(500).json({ message: "Database error", error: err });
  
      // If no results are found
      if (results.length === 0) {
        return res.status(404).json(`No applications found with status ${status} for this user.`);
      }
  
      // Return the results with job_id and professional_id
      return res.status(200).json(results);
    });
  };


  // Retrieve all existing companies

  // Retrieve all companies
export const getAllCompanies = (req, res) => {
    // SQL query to retrieve all companies
    const query = "SELECT * FROM companies";
  
    db.query(query, (err, results) => {
      if (err) return res.status(500).json({ message: "Database error", error: err });
  
      // If no results are found
      if (results.length === 0) {
        return res.status(404).json("No companies found.");
      }
  
      // Return the results with company details
      return res.status(200).json(results);
    });
  };
  
  