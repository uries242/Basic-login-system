const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
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
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Incorrect email or password' });
    }

    const correctPw = await user.isCorrectPassword(password);
    if (!correctPw) {
      return res.status(400).json({ message: 'Incorrect email or password' });
    }

    const token = jwt.sign(
      { _id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    const { password: _, ...userResponse } = user.toObject();
    res.json({ token, user: userResponse });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
