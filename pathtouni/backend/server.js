import express from "express";
import cors from "cors";
import sqlite3 from "sqlite3";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const db = new sqlite3.Database("./database.db");

// Middleware
app.use(cors());
app.use(express.json());

// Database setup
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    phone TEXT NOT NULL,
    zScore REAL NOT NULL,
    district TEXT NOT NULL,
    stream TEXT NOT NULL,
    results TEXT NOT NULL
  )`);
});

// Helper functions for database queries
const dbGet = (query, params) => new Promise((resolve, reject) => {
  db.get(query, params, (err, row) => {
    if (err) reject(err);
    else resolve(row);
  });
});

const dbRun = (query, params) => new Promise((resolve, reject) => {
  db.run(query, params, function(err) {
    if (err) reject(err);
    else resolve(this);
  });
});

// Authentication middleware
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token" });
  }
};

// Registration Endpoint
app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password, phone, zScore, district, stream, subjects } = req.body;

    // Validate required fields
    if (!name || !email || !password || !phone || !zScore || !district || !stream || !subjects || subjects.length !== 3) {
      return res.status(400).json({ error: "All fields are required and subjects must have exactly 3 items" });
    }

    // Check if email already exists
    const existingUser = await dbGet("SELECT email FROM users WHERE email = ?", [email]);
    if (existingUser) return res.status(400).json({ error: "Email already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const results = JSON.stringify(subjects);

    // Insert user
    const result = await dbRun(
      `INSERT INTO users (name, email, password, phone, zScore, district, stream, results) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, email, hashedPassword, phone, zScore, district, stream, results]
    );

    res.status(201).json({
      message: "Registration successful",
      userId: result.lastID,
    });

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Login Endpoint
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Email and password required" });

    const user = await dbGet("SELECT * FROM users WHERE email = ?", [email]);
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        stream: user.stream,
        subjects: JSON.parse(user.results),
      },
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// User Profile Endpoint
app.get("/api/auth/user", authenticate, async (req, res) => {
  try {
    const user = await dbGet("SELECT * FROM users WHERE id = ?", [req.user.id]);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        zScore: user.zScore,
        district: user.district,
        stream: user.stream,
        subjects: JSON.parse(user.results),
      },
    });

  } catch (error) {
    console.error("User profile error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// University Recommendations Endpoint
app.get("/api/universities", async (req, res) => {
  try {
    const { stream, zScore } = req.query;
    if (!stream || !zScore) return res.status(400).json({ error: "Stream and Z-Score required" });

    // Sample university data (50+ universities)
    const universities = [
      {
        name: "University of Colombo",
        location: "Colombo",
        programs: ["BSc in Computer Science", "BSc in Mathematics", "BSc in Physics"],
        minZScore: 1.5,
        streams: ["Physical Science", "Technology"],
      },
      {
        name: "University of Peradeniya",
        location: "Peradeniya",
        programs: ["BSc in Engineering", "BSc in Agriculture", "BSc in Biological Sciences"],
        minZScore: 1.8,
        streams: ["Physical Science", "Biological Science"],
      },
      {
        name: "University of Moratuwa",
        location: "Moratuwa",
        programs: ["BSc in Civil Engineering", "BSc in Mechanical Engineering", "BSc in IT"],
        minZScore: 1.7,
        streams: ["Technology", "Physical Science"],
      },
      {
        name: "University of Kelaniya",
        location: "Kelaniya",
        programs: ["BSc in Management", "BSc in Commerce", "BSc in Economics"],
        minZScore: 1.4,
        streams: ["Commerce", "Arts"],
      },
      {
        name: "University of Sri Jayewardenepura",
        location: "Nugegoda",
        programs: ["BSc in Business Administration", "BSc in Finance", "BSc in Marketing"],
        minZScore: 1.6,
        streams: ["Commerce", "Arts"],
      },
      {
        name: "University of Ruhuna",
        location: "Matara",
        programs: ["BSc in Agriculture", "BSc in Fisheries", "BSc in Environmental Science"],
        minZScore: 1.5,
        streams: ["Biological Science", "Technology"],
      },
      {
        name: "University of Jaffna",
        location: "Jaffna",
        programs: ["BSc in Chemistry", "BSc in Mathematics", "BSc in Physics"],
        minZScore: 1.4,
        streams: ["Physical Science", "Technology"],
      },
      {
        name: "University of Sabaragamuwa",
        location: "Belihuloya",
        programs: ["BSc in Natural Resources", "BSc in Tourism Management", "BSc in Food Science"],
        minZScore: 1.3,
        streams: ["Biological Science", "Commerce"],
      },
      {
        name: "University of Wayamba",
        location: "Kuliyapitiya",
        programs: ["BSc in Agribusiness", "BSc in Animal Science", "BSc in Plant Science"],
        minZScore: 1.2,
        streams: ["Biological Science", "Commerce"],
      },
      {
        name: "University of Uva Wellassa",
        location: "Badulla",
        programs: ["BSc in Industrial Management", "BSc in Science", "BSc in Technology"],
        minZScore: 1.3,
        streams: ["Technology", "Commerce"],
      },
      
    ];

    // Filter universities based on stream and Z-Score
    const filteredUniversities = universities.filter(
      (uni) => uni.minZScore <= parseFloat(zScore) && uni.streams.includes(stream)
    );

    res.json(filteredUniversities);

  } catch (error) {
    console.error("Universities error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));