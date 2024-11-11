const mongoose = require('mongoose');


// Database connection
const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI; // Retrieve URI from environment variables
    if (!uri) {
      throw new Error('MongoDB URI is not defined in environment variables');
    };
    await mongoose.connect(uri);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
