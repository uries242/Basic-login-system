const express = require('express');
const router = express.Router();

// POST /api/users/register
router.post('/register', (req, res) => {
  res.send('Register route - coming soon');
});

// POST /api/users/login
router.post('/login', (req, res) => {
  res.send('Login route - coming soon');
});

module.exports = router;
