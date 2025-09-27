const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); 
const connectDB = require('./config/db');

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');

dotenv.config();
connectDB();

const app = express();

// --- Production CORS Configuration ---
const corsOptions = {
  origin: 'https://shiny-lily-ef230a.netlify.app',
  optionsSuccessStatus: 200 
};
app.use(cors(corsOptions));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

// --- API Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

const PORT = process.env.PORT || 5000; // Render uses its own PORT variable
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

