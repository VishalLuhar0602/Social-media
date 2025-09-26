const Post = require('../models/Post');
const User = require('../models/User');

// @route   POST api/posts
// @desc    Create a post
// @access  Private
exports.createPost = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    const newPost = new Post({
      content: req.body.content,
      author: req.user.id,
    });

    const post = await newPost.save();
    
    // Populate author details before sending back
    const populatedPost = await Post.findById(post._id).populate('author', ['name']);
    
    res.status(201).json(populatedPost);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


// @route   GET api/posts
// @desc    Get all posts with pagination
// @access  Public
exports.getPosts = async (req, res) => {
  // Define how many posts to send per page
  const limit = parseInt(req.query.limit) || 10;
  // Define which page to fetch
  const page = parseInt(req.query.page) || 1;

  try {
    const posts = await Post.find()
      .populate('author', ['name']) // Populate author details
      .populate({ // Also populate the author of each comment
        path: 'comments.author',
        select: 'name'
      })
      .sort({ createdAt: -1 }) // Get newest posts first
      .skip((page - 1) * limit) // Skip posts from previous pages
      .limit(limit); // Limit the number of posts for the current page

    // Get the total number of posts to help the frontend know when to stop fetching
    const totalPosts = await Post.countDocuments();

    res.json({
      posts,
      totalPages: Math.ceil(totalPosts / limit),
      currentPage: page,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


// @route   PUT api/posts/:id/like
// @desc    Like or unlike a post
// @access  Private
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // Check if the post has already been liked by this user
    if (post.likes.some((like) => like.toString() === req.user.id)) {
      // If yes, remove the like (unlike)
      post.likes = post.likes.filter(
        (like) => like.toString() !== req.user.id
      );
    } else {
      // If no, add the like
      post.likes.unshift(req.user.id);
    }

    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


// @route   POST api/posts/:id/comment
// @desc    Comment on a post
// @access  Private
exports.addComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    const newComment = {
      text: req.body.text,
      author: req.user.id,
    };

    post.comments.unshift(newComment);
    await post.save();
    
    // Populate author details in the comments before sending back
    const populatedPost = await Post.findById(req.params.id).populate('comments.author', ['name']);

    res.json(populatedPost.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

