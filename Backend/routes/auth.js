const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware'); // Import the middleware

// Import the controller functions
const { signup, login, getMe } = require('../controllers/authController');

// @route   POST api/auth/signup
// @desc    Register a user
// @access  Public
router.post('/signup', signup);

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', login);

// @route   GET api/auth/me
// @desc    Get logged in user
// @access  Private
router.get('/me', authMiddleware, getMe); // We've added authMiddleware here!

module.exports = router;
