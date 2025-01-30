const mongoose = require('mongoose');
const config = require('../config');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.mongodb.uri, config.mongodb.options);
    console.log(`MongoDB Atlas Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
