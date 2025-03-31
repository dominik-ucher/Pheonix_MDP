import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// professionals REGISTER, LOGIN, LOGOUT

export const register = (req, res) => {
  const { first_name, last_name, birthdate, email, password, address, phone_number, link_to_cv } = req.body;

  // Validate input data
  if (!first_name || !last_name || !birthdate || !email || !password || !address || !phone_number || !link_to_cv) {
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

  // Check if the email already exists
  const checkQuery = "SELECT * FROM professionals WHERE email = ?";
  db.query(checkQuery, [email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists with this email!");

    // Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    // Insert new user into the professionals table
    const insertQuery = "INSERT INTO professionals (first_name, last_name, birthdate, email, password, address, phone_number, link_to_cv) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [first_name, last_name, birthdate, email, hash, address, phone_number, link_to_cv];

    db.query(insertQuery, values, (err, result) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User has been created successfully.");
    });
  });
};

export const login = (req, res) => {
  // CHECK USER
  const q = "SELECT * FROM professionals WHERE email = ?";

  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    // Check password
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!isPasswordCorrect)
      return res.status(400).json("Wrong email or password!");

    const token = jwt.sign({ id: data[0].id }, process.env.JWT_SECRET || "jwtkey", { expiresIn: '6h' });

    const { password, ...other } = data[0];

    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',  // Secure cookie in production
        sameSite: 'None',  // Make it 'Strict' or 'Lax' based on your needs
      })
      .status(200)
      .json(other);  // Send user data without password
  });
};

export const logout = (req, res) => {
  res.clearCookie("access_token", {
    sameSite: "None",
    secure: process.env.NODE_ENV === 'production',  // Secure cookie in production
  }).status(200).json("User has been logged out.");
};
