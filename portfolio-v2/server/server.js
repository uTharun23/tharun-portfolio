const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

const { connectDB } = require('./config/db');
const apiRoutes = require('./routes/api');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Database Connection
connectDB();

// Global Middlewares
app.use(helmet({
  crossOriginResourcePolicy: false, // Allow local assets loading
}));

// CORS Configuration
const allowedOrigins = [
  process.env.CLIENT_URL || 'http://localhost:4200',
  'http://localhost:4200',
  'http://127.0.0.1:4200'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(compression()); // Compress all routes responses
app.use(express.json()); // JSON parser
app.use(express.urlencoded({ extended: true })); // URL encoded parser

// Logging with Morgan (only in non-testing environments)
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Rate Limiting to prevent spam/abuse
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: { error: 'Too many requests from this IP, please try again after 15 minutes.' }
});

const formSubmissionLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Limit each IP to 5 contact forms / guestbook signatures per hour
  message: { error: 'Too many submissions from this IP, please try again in an hour.' }
});

// Apply rate limiters
app.use('/api/', generalLimiter);
app.use('/api/contact', formSubmissionLimiter);
app.use('/api/guestbook', formSubmissionLimiter);

// Register API Routes
app.use('/api', apiRoutes);

// Server static files in upload directory (e.g. resumes, certificates if needed)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Root route welcome message
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Personal Portfolio Backend API.',
    docs: '/api/health'
  });
});

// Global Error Handler Middleware
app.use(errorHandler);

// Start Server (only locally, Vercel wraps the app export serverless)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running in development mode on port ${PORT}`);
  });
}

module.exports = app;
