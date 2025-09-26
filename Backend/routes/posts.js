const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');

// Import all controller functions correctly
const {
  createPost,
  getPosts,
  likePost,
  addComment,
} = require('../controllers/postController');

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post('/', auth, createPost);

// @route   GET api/posts
// @desc    Get all posts
// @access  Public
router.get('/', getPosts);

// @route   PUT api/posts/:id/like
// @desc    Like or unlike a post
// @access  Private
router.put('/:id/like', auth, likePost);

// @route   POST api/posts/:id/comment
// @desc    Comment on a post
// @access  Private
router.post('/:id/comment', auth, addComment);

module.exports = router;
