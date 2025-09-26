import axios from 'axios';

const API_URL = 'https://social-media-reeh.onrender.com/api/posts';

// Function to get the auth token from local storage
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Create a post
const createPost = async (postData) => {
  const token = getAuthToken();
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token, // Attach the token here
    },
  };
  const response = await axios.post(API_URL, postData, config);
  return response.data;
};

// Get all posts with pagination
const getAllPosts = async (page = 1, limit = 10) => {
  const response = await axios.get(`${API_URL}?page=${page}&limit=${limit}`);
  return response.data;
};

// Like or unlike a post
const likePost = async (postId) => {
  const token = getAuthToken();
  const config = {
    headers: {
      'x-auth-token': token,
    },
  };
  const response = await axios.put(`${API_URL}/${postId}/like`, null, config);
  return response.data;
};

// Add a comment to a post
const addComment = async (postId, commentData) => {
  const token = getAuthToken();
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token,
    },
  };
  const response = await axios.post(`${API_URL}/${postId}/comment`, commentData, config);
  return response.data;
};


const postService = {
  createPost,
  getAllPosts,
  likePost,
  addComment,
};

export default postService;

