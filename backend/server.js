
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const moodRoutes = require('./routes/moodRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middleware/errorHandler');

console.log("Gemini Key Loaded:", process.env.GEMINI_API_KEY ? "YES (Length: " + process.env.GEMINI_API_KEY.length + ")" : "NO"); // Add this line
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// CORS Configuration
app.use(cors({
  origin: 'http://localhost:5173', // Vite default port
  credentials: true, // Allow cookies
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/mood', moodRoutes);

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));