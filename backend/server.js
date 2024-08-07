const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const PORT = 3001;

const app = express();
const db = new sqlite3.Database("./database.db"); // Persisted SQLite database file

app.use(cors());
app.use(express.json());

// Setup JWT secret
const JWT_SECRET = "YOUR_SECRET_KEY";

// Initialize database and create tables if they do not exist
function initializeDatabase() {
  const schema = fs.readFileSync(path.join(__dirname, "database.sql"), "utf8");
  db.exec(schema, (err) => {
    if (err) console.error("Error initializing database:", err.message);
  });
}
initializeDatabase();

// Register API
app.post("/register", (req, res) => {
  const { username, password, role, name, grade, subject } = req.body;
  bcrypt.hash(password, 8, (err, hashedPassword) => {
    if (err) return res.status(500).json({ error: err.message });

    db.run(
      `INSERT INTO Users (username, password, role) VALUES (?, ?, ?)`,
      [username, hashedPassword, role],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });

        const userId = this.lastID;
        if (role === "student") {
          db.run(
            `INSERT INTO Students (name, grade, user_id) VALUES (?, ?, ?)`,
            [name, grade, userId],
            (err) => {
              if (err) return res.status(500).json({ error: err.message });
              res
                .status(201)
                .json({ message: "Student registered successfully" });
            }
          );
        } else if (role === "teacher") {
          db.run(
            `INSERT INTO Teachers (name, subject, user_id) VALUES (?, ?, ?)`,
            [name, subject, userId],
            (err) => {
              if (err) return res.status(500).json({ error: err.message });
              res
                .status(201)
                .json({ message: "Teacher registered successfully" });
            }
          );
        }
      }
    );
  });
});

// Login API
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  db.get(`SELECT * FROM Users WHERE username = ?`, [username], (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user)
      return res.status(401).json({ message: "Invalid username or password" });
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!isMatch)
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      const token = jwt.sign(
        { user_id: user.user_id, role: user.role },
        JWT_SECRET
      );
      res.json({ token });
    });
  });
});

// Middleware to check JWT
function authenticateToken(req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Get students list
app.get("/students", authenticateToken, (req, res) => {
  if (req.user.role !== "teacher") return res.sendStatus(403);
  db.all(`SELECT * FROM Students`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Get teachers list
app.get("/teachers", authenticateToken, (req, res) => {
  if (req.user.role !== "teacher") return res.sendStatus(403);
  db.all(`SELECT * FROM Teachers`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Add student
app.post("/students", authenticateToken, (req, res) => {
  const { name, grade } = req.body;
  if (req.user.role !== "teacher") return res.sendStatus(403);
  db.run(
    `INSERT INTO Students (name, grade, user_id) VALUES (?, ?, ?)`,
    [name, grade, req.user.user_id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Student added successfully" });
    }
  );
});

// Add teacher
app.post("/teachers", authenticateToken, (req, res) => {
  const { name, subject } = req.body;
  if (req.user.role !== "teacher") return res.sendStatus(403);
  db.run(
    `INSERT INTO Teachers (name, subject, user_id) VALUES (?, ?, ?)`,
    [name, subject, req.user.user_id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Teacher added successfully" });
    }
  );
});

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
