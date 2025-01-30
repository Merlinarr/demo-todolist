const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/User');
const Todo = require('../models/Todo');

exports.signup = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).send({
        status: 400,
        code: '400',
        message: 'Email already registered!'
      });
    }

    // Hash password
    const hashPassword = bcrypt.hashSync(password, 10);
    
    // Create new user
    const user = await User.create({
      email,
      password: hashPassword
    });

    if (!user) {
      return res.status(400).send({
        status: 400,
        code: '400',
        message: 'Registration failed!'
      });
    }

    res.send({
      status: 200,
      code: '200',
      message: 'Registration successful!'
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      code: '500',
      message: error.message
    });
  }
};


exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({
        status: 400,
        code: '400',
        message: 'Login failed!'
      });
    }

    // Verify password
    const compareResult = bcrypt.compareSync(password, user.password);
    if (!compareResult) {
      return res.status(400).send({
        status: 400,
        code: '400',
        message: 'Login failed!'
      });
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      config.jwtSecretKey,
      { expiresIn: config.expiresIn }
    );

    res.send({
      status: 200,
      code: '200',
      data: {
        token,
        user: {
          id: user._id,
          email: user.email
        }
      }
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      code: '500',
      message: error.message
    });
  }
};

// Todo handlers
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.id });
    res.send({
      status: 200,
      code: '200',
      data: todos
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      code: '500',
      message: error.message
    });
  }
};

exports.createTodo = async (req, res) => {
  try {
    const todo = await Todo.create({
      ...req.body,
      userId: req.user.id
    });
    res.send({
      status: 200,
      code: '200',
      data: todo
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      code: '500',
      message: error.message
    });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!todo) {
      return res.status(404).send({
        status: 404,
        code: '404',
        message: 'Todo not found'
      });
    }
    res.send({
      status: 200,
      code: '200',
      data: todo
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      code: '500',
      message: error.message
    });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });
    if (!todo) {
      return res.status(404).send({
        status: 404,
        code: '404',
        message: 'Todo not found'
      });
    }
    res.send({
      status: 200,
      code: '200',
      data: todo
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      code: '500',
      message: error.message
    });
  }
};
