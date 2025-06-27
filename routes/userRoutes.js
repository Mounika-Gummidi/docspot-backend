const express = require('express');
const router = express.Router();
const { loginUser, registerUser } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/userModel');

router.post('/login', loginUser);

router.post('/register', registerUser);

router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('name');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error('Error in /me route:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
