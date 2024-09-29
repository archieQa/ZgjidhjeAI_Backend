// app.js
const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const passport = require("./utils/oauthStrategy"); // Import passport
const authRoutes = require("./routes/authRoutes");
const { pool } = require("./config/config");

// Middleware
app.use(bodyParser.json());
app.use(passport.initialize()); // Initialize passport

// Routes
app.use("/auth", authRoutes);

// Basic route
app.get("/", (req, res) => {
  res.send("Authentication Service is up and running!");
});

// Test DB connection
app.get("/db-test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error executing query", err.stack);
    res.status(500).send("Database error");
  }
});

module.exports = app;
