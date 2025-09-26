import axios from 'axios';

// The base URL of our backend API
const API_URL = 'https://social-media-reeh.onrender.com/api/auth';

// Signup function
const signup = (name, email, password) => {
  return axios.post(API_URL + 'signup', {
    name,
    email,
    password,
  });
};

// Login function (we'll use this later)
const login = (email, password) => {
  return axios.post(API_URL + 'login', {
    email,
    password,
  });
};

const authService = {
  signup,
  login,
};

export default authService;
