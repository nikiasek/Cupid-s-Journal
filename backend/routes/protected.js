const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/dashboard', auth, (req, res) => {
  res.send('Welcome to the dashboard');
});

module.exports = router;
