import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const db = new sqlite3.Database('./database.db');

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
    results TEXT NOT NULL,
    interests TEXT NOT NULL
  )`);
});

// Registration Endpoint
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, phone, zScore, district, stream, results, interests } = req.body;
    
    // Validate all fields
    if (!name || !email || !password || !phone || !zScore || !district || !stream || !results || !interests) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check existing user
    db.get('SELECT email FROM users WHERE email = ?', [email], async (err, row) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      if (row) return res.status(400).json({ error: 'Email already exists' });

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Insert user
      db.run(
        `INSERT INTO users (
          name, email, password, phone, 
          zScore, district, stream, results, interests
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [name, email, hashedPassword, phone, zScore, district, stream, results, JSON.stringify(interests)],
        function(err) {
          if (err) return res.status(500).json({ error: 'Registration failed' });
          res.status(201).json({ 
            message: 'Registration successful',
            userId: this.lastID 
          });
        }
      );
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Login Endpoint
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate inputs
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    // Find user
    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      if (!user) return res.status(401).json({ error: 'Invalid credentials' });

      // Verify password
      const validPass = await bcrypt.compare(password, user.password);
      if (!validPass) return res.status(401).json({ error: 'Invalid credentials' });

      // Create JWT token
      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      // Return user data
      res.json({
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      });
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));