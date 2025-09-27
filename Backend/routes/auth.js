const express = require('express');
const router = express.Router();
const { signup, login, getMe } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

// @route   POST api/auth/signup
// @desc    Register user
// @access  Public
router.post('/signup', signup);

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', login);

// @route   GET api/auth/me
// @desc    Get logged in user's data
// @access  Private
router.get('/me', authMiddleware, getMe);

module.exports = router;
