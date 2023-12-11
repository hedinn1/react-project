// routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const userModel = require('../models/users');

const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await userModel.findOne({ username });

    if (user && bcrypt.compareSync(password, user.password)) {
      // Successful login
      res.status(200).json({ message: 'Login successful' });
    } else {
      // Invalid username or password
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    // Server error
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;