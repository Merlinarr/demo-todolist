const bcrypt = require('bcryptjs');
const User = require('../models/User');

const createInitialUser = async () => {
  try {
    // Check if test user already exists
    const existingUser = await User.findOne({ email: 'test@gmail.com' });
    if (existingUser) {
      console.log('Test user already exists');
      return;
    }

    // Create test user
    const hashPassword = bcrypt.hashSync('1234', 10);
    await User.create({
      email: 'test@gmail.com',
      password: hashPassword
    });

    console.log('Test user created successfully');
  } catch (error) {
    console.error('Error creating test user:', error);
  }
};

module.exports = createInitialUser; 