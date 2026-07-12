const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log('=> Using existing database connection');
    return true;
  }

  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    console.warn('WARN: MONGO_URI environment variable is missing. Server will fall back to local in-memory/JSON storage.');
    return false;
  }

  try {
    const db = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of hanging
    });
    isConnected = db.connections[0].readyState === 1;
    console.log('MongoDB Connected Successfully:', db.connection.host);
    return true;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    console.warn('WARN: MongoDB connection failed. Server will fall back to local in-memory/JSON storage.');
    return false;
  }
};

module.exports = { connectDB };
