const mongoose = require('mongoose');

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/employeeDB", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
