import React, { useState } from 'react';
import { Box, TextField, Button, Alert } from '@mui/material';
import postService from '../services/postService';

const CreatePost = ({ onPostCreated }) => {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    if (!content.trim()) return;

    try {
      const newPost = await postService.createPost({ content });
      onPostCreated(newPost); // Notify parent component
      setContent(''); // Clear the input field
    } catch (err) {
      // Set a specific error message from the server if available
      const message =
        (err.response && err.response.data && err.response.data.msg) ||
        'You must be logged in to create a post.';
      setError(message);
      console.error('Failed to create post:', err);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <TextField
        fullWidth
        multiline
        rows={3}
        label="What's on your mind?"
        variant="outlined"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      {error && <Alert severity="error" sx={{ mt: 1 }}>{error}</Alert>}
      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 2 }}
      >
        Post
      </Button>
    </Box>
  );
};

export default CreatePost;

