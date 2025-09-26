import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import FeedPage from './pages/FeedPage';
import { CssBaseline, Container } from '@mui/material'; // For consistent styling

function App() {
  return (
    <>
      <CssBaseline /> {/* MUI's tool for consistent baseline styles */}
      <Navbar />
      <Container component="main" sx={{ mt: 4, mb: 4 }}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<FeedPage />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;

