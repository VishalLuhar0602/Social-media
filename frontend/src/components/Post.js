import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, Avatar, Typography, IconButton, TextField, Button, Box, Divider, CircularProgress } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import postService from '../services/postService';

const Post = ({ post }) => {
  // --- Hooks must be called at the top and in the same order ---
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

  // --- Use useEffect to sync state with props and get the current user ID ---
  useEffect(() => {
    // This effect runs whenever the 'post' prop changes.
    if (post) {
      setLikes(post.likes || []); // Ensure likes is always an array
      setComments(post.comments || []); // Ensure comments is always an array

      const token = localStorage.getItem('token');
      if (token) {
        try {
          const user = JSON.parse(atob(token.split('.')[1])).user;
          setCurrentUserId(user.id);
          // Check if the current user's ID is in the likes array
          setIsLiked((post.likes || []).some(like => like === user.id || like._id === user.id));
        } catch (e) {
          console.error("Failed to parse token:", e);
          setCurrentUserId(null);
        }
      }
    }
  }, [post]); // The dependency array makes this effect re-run when the post prop changes

  // --- Early return if post data is not yet available ---
  if (!post || !post.author) {
    return (
      <Card sx={{ mb: 2, p: 2 }}>
        <CircularProgress />
      </Card>
    );
  }

  const handleLike = async () => {
    if(!currentUserId) return alert('You must be logged in to like a post.');
    try {
      const updatedLikes = await postService.likePost(post._id);
      setLikes(updatedLikes);
      setIsLiked(updatedLikes.some(like => like === currentUserId || like._id === currentUserId));
    } catch (error) {
      console.error('Failed to like post:', error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if(!currentUserId) return alert('You must be logged in to comment.');
    if (!newComment.trim()) return;
    try {
      const updatedComments = await postService.addComment(post._id, { text: newComment });
      setComments(updatedComments);
      setNewComment('');
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: 'secondary.main' }}>{post.author.name ? post.author.name.charAt(0) : 'U'}</Avatar>}
        title={post.author.name || 'Unknown User'}
        subheader={new Date(post.createdAt).toLocaleString()}
      />
      <CardContent>
        <Typography variant="body1">{post.content}</Typography>
      </CardContent>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
        <IconButton onClick={handleLike}>
          {isLiked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
        </IconButton>
        <Typography variant="body2">{likes.length} Likes</Typography>
        <ChatBubbleOutlineIcon sx={{ ml: 2 }} />
        <Typography variant="body2" sx={{ ml: 1 }}>{comments.length} Comments</Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }} component="form" onSubmit={handleCommentSubmit}>
        <TextField
          fullWidth
          variant="standard"
          label="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button type="submit" sx={{ mt: 1 }}>Post</Button>
      </Box>
      {comments.map((comment) => (
        <Box key={comment._id} sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
          <Avatar sx={{ bgcolor: 'primary.light', width: 24, height: 24, mr: 1 }}>
            {/* Robust check for author and name */}
            {comment.author && comment.author.name ? comment.author.name.charAt(0) : 'U'}
          </Avatar>
          <Typography variant="body2">
            <strong>{comment.author && comment.author.name ? comment.author.name : 'Unknown'}</strong>: {comment.text}
          </Typography>
        </Box>
      ))}
    </Card>
  );
};

export default Post;

