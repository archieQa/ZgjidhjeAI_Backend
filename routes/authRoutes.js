// routes/authRoutes.js
const express = require("express");
const passport = require("../utils/oauthStrategy");
const router = express.Router();
const { findUserByEmail, createUser } = require("../models/userModel");
const { sendPasswordResetEmail } = require("../services/emailService");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const { pool } = require("../config/config");

// User Registration route

router.post("/register", async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (!email || !username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Hash the password before creating the user
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await createUser(email, username, hashedPassword);
    const token = generateToken(newUser);
    res
      .status(201)
      .json({ message: "User Registered successfully", token, hashedPassword });
  } catch (error) {
    console.error("Error in user registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// User Login route

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error in user login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Password reset request route

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a password reset token for the user

    const resetToken = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send the password reset email to the user

    const resetLink = `http://localhost:3000/reset-password/${resetToken}`;
    await sendPasswordResetEmail(user.email, resetLink);
  } catch (error) {
    console.error("Error in forgot password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Password reset route

router.post("/reset-password", async (req, res) => {
  const { resetToken, newPassword } = req.body;

  try {
    const decoded = jwt.verify(resetToken, process.env.JWT_SECRET);
    const user = await findUserByEmail(decoded.email);

    if (!user) {
      return res
        .status(404)
        .json({ message: "Invalid token or user not found" });
    }

    // Hash the new password and update in database

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const query = `UPDATE users SET password = $1 WHERE email = $2 RETURNING *;`;
    const result = await pool.query(query, [hashedPassword, user.email]);

    res.status(200).json({ message: "Password successfully reset" });
  } catch (error) {
    console.error("Error in reset password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Google OAuth route
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Google OAuth callback route
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  (req, res) => {
    // On successful authentication, send token
    res.json({ token: req.user.token });
    res.redirect("/http://localhost:3000/login");
  }
);

module.exports = router;
