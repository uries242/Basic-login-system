const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST /api/users/register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'A user with that email already exists' });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    const { password: _, ...userResponse } = newUser.toObject();
    res.status(201).json(userResponse);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/users/login
router.post('/login', (req, res) => {
  res.send('Login route - coming soon');
});

module.exports = router;
