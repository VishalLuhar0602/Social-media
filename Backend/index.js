const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// --- Route Files ---
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');

// --- Initial Setup ---
dotenv.config();
connectDB();
const app = express();

// --- Production CORS Configuration ---
// This explicitly allows YOUR Netlify site to make requests.
const corsOptions = {
  origin: 'https://shiny-lily-ef230a.netlify.app',
  optionsSuccessStatus: 200 
};
app.use(cors(corsOptions));

// --- Middlewares ---
app.use(express.json());

// --- Test Route ---
// This helps us confirm the server is running.
app.get('/', (req, res) => {
  res.send('API is running and correctly configured.');
});

// --- API Routes ---
// This is where the 404 is happening. This code makes sure the routes are registered.
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// --- Server Start ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

