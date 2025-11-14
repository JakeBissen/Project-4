

const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const pool = require('./db');


router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const [users] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);

    if (users.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = users[0];
    const match = await bcrypt.compare(password, user.password_hash);

    if (!match) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({ message: 'Login successful', 
      username: user.username, 
      email: user.email,
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;



router.post('/register', async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const [existing] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    if (existing.length > 0) {
      return res.status(400).json({ error: 'Username already taken' });
    }

    const password_hash = await bcrypt.hash(password, 10);

    const sql = 'INSERT INTO users (username, password_hash, email) VALUES (?, ?, ?)';
    const [result] = await pool.query(sql, [username, password_hash, email]);

    res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});






router.get('/category-stats', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT c.name AS category, COUNT(q.id) AS question_count
      FROM categories c
      LEFT JOIN questions q ON q.category_id = c.id
      GROUP BY c.name
    `);
    res.json(rows);
  } catch (err) {
    console.error('Category stats error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/questions', async (req, res) => {
  const { title, body, category } = req.body;
  const [catRow] = await pool.query('SELECT id FROM categories WHERE name = ?', [category]);
  const categoryId = catRow[0]?.id;

  await pool.query(
    'INSERT INTO questions (title, body, category_id) VALUES (?, ?, ?)',
    [title, body, categoryId]
  );

  res.status(201).json({ message: 'Question added' });
});

router.get('/questions/:category', async (req, res) => {
  const categoryName = req.params.category;

  try {
    const [categoryRows] = await pool.query('SELECT id FROM categories WHERE name = ?', [categoryName]);
    if (categoryRows.length === 0) {
      return res.status(404).json([]);
    }

    const categoryId = categoryRows[0].id;
    const [questions] = await pool.query(
      'SELECT id, title, body FROM questions WHERE category_id = ? ORDER BY created_at DESC',
      [categoryId]
    );

    res.json(questions);
  } catch (err) {
    console.error(err);
    res.status(500).json([]);
  }
});

module.exports = router;