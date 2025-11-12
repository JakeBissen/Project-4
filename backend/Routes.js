

Router.post('/login', async (req,res) => {
    const {username, password} = req.body;

    try {
        const [rows] = await pool.query('select * from users where username = ?', [username]);
        if (rows.length === 0) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        const user = rows[0];
        const isValid = await bcrypt.compare(password, user.password_hash);

        if (!isValid) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        res.json({ message: 'Login Successful', username: user.username });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
    
});



const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../db');

const router = express.Router();

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

module.exports = router;

