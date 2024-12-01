import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

dotenv.config();
const __dirname = dirname(fileURLToPath(import.meta.url));
const db = new Database(join(__dirname, 'database.sqlite'));
const app = express();
const PORT = 3000;
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.error('JWT_SECRET is required');
  process.exit(1);
}

app.use(cors());
app.use(express.json());

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT,
    name TEXT
  );

  CREATE TABLE IF NOT EXISTS jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    company TEXT,
    position TEXT,
    status TEXT,
    appliedDate TEXT,
    notes TEXT,
    nextFollowUp TEXT,
    FOREIGN KEY (userId) REFERENCES users (id)
  );
`);

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Auth routes
app.post('/api/register', async (req, res) => {
  const { email, password, name } = req.body;
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const stmt = db.prepare('INSERT INTO users (email, password, name) VALUES (?, ?, ?)');
    const result = stmt.run(email, hashedPassword, name);
    
    const token = jwt.sign({ id: result.lastInsertRowid, email }, JWT_SECRET);
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: 'Email already exists' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  
  const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
  const user = stmt.get(email);
  
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  const token = jwt.sign({ id: user.id, email }, JWT_SECRET);
  res.json({ token });
});

// Jobs routes
app.get('/api/jobs', authenticateToken, (req, res) => {
  const stmt = db.prepare('SELECT * FROM jobs WHERE userId = ? ORDER BY appliedDate DESC');
  const jobs = stmt.all(req.user.id);
  res.json(jobs);
});

app.post('/api/jobs', authenticateToken, (req, res) => {
  const { company, position, status, notes, appliedDate } = req.body;
  
  const stmt = db.prepare(`
    INSERT INTO jobs (userId, company, position, status, appliedDate, notes)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  
  const result = stmt.run(req.user.id, company, position, status, appliedDate, notes);
  res.json({ id: result.lastInsertRowid, ...req.body });
});

app.patch('/api/jobs/:id', authenticateToken, (req, res) => {
  const { status } = req.body;
  const stmt = db.prepare('UPDATE jobs SET status = ? WHERE id = ? AND userId = ?');
  stmt.run(status, req.params.id, req.user.id);
  
  const getStmt = db.prepare('SELECT * FROM jobs WHERE id = ? AND userId = ?');
  const updatedJob = getStmt.get(req.params.id, req.user.id);
  res.json(updatedJob);
});

app.delete('/api/jobs/:id', authenticateToken, (req, res) => {
  const stmt = db.prepare('DELETE FROM jobs WHERE id = ? AND userId = ?');
  stmt.run(req.params.id, req.user.id);
  res.json({ message: 'Job deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});