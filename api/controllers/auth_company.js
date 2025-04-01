import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//company auth : REGISTER, LOGIN, LOGOUT

export const register = (req, res) => {
  const { email, username, password, company_name, vat_number, ateco_code, business_sector } = req.body;

  // Check for existing email, username, vat_number, or ateco_code
  const q = "SELECT * FROM companies WHERE email = ? OR username = ? OR vat_number = ? OR ateco_code = ?";

  db.query(q, [email, username, vat_number, ateco_code], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("Email, username, VAT number, or ATECO code already exists!");

    // Hash the password and create the company
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const insertQuery = "INSERT INTO companies(`email`, `password`, `company_name`, `username`, `vat_number`, `ateco_code`, `business_sector`) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [email, hash, company_name, username, vat_number, ateco_code, business_sector];

    db.query(insertQuery, values, (err, result) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Company has been created.");
    });
  });
};

export const login = (req, res) => {
  // CHECK USER

  const q = "SELECT * FROM companies WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    // Check password
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!isPasswordCorrect)
      return res.status(400).json("Wrong username or password!");

    const token = jwt.sign({ id: data[0].id }, "jwtkey", {expiresIn: '6h'});
    const { password, ...other } = data[0];

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  });
};

export const logout = (req, res) => {
  res.clearCookie("access_token",{
    sameSite:"none",
    secure:true
  }).status(200).json("User has been logged out.")
};
