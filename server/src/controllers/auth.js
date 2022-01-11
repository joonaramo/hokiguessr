const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const FieldError = require('../utils/errors');

/**
 * Function used to sign up new user
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 */
const signUp = async (req, res) => {
  const { username, password } = req.body;

  // Check if user with given username already exists
  const foundUser = await User.findOne({ username });
  if (foundUser) {
    const e = new FieldError('This username is already taken', 'username');
    e.name = 'USERNAME_TAKEN_ERROR';
    throw e;
  }

  const date = new Date(Date.now());

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // Save user to DB
  const newUser = new User({
    username,
    password: hash,
    points: 100,
    is_admin: 0,
    created_at: date,
    updated_at: date,
  });
  const user = await newUser.save();

  // Sign JWT token, return the token and user data
  const payload = {
    user: {
      id: user.id,
      username: user.username,
      is_admin: user.is_admin,
    },
  };
  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: '7d' },
    (err, token) => {
      if (err) throw err;
      return res.json({ token, user });
    }
  );
};

/**
 * Function used to log in user
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 */
const logIn = async (req, res) => {
  const { username, password } = req.body;

  // Check if user with given username exists
  let user = await User.findOne({ username });
  if (!user) {
    const e = new Error('Wrong username or password');
    e.name = 'INVALID_CREDENTIALS_ERROR';
    throw e;
  }

  // Check if password is correct
  const passwordCorrect = await bcrypt.compare(password, user.password);
  if (!passwordCorrect) {
    const e = new Error('Wrong username or password');
    e.name = 'INVALID_CREDENTIALS_ERROR';
    throw e;
  }

  // Sign JWT token and return the token and user data
  const payload = {
    user: {
      id: user.id,
      username: user.username,
      is_admin: user.is_admin,
    },
  };
  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: '7d' },
    (err, token) => {
      if (err) throw err;
      return res.json({ token, user });
    }
  );
};

/**
 * Get current user's data
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 */
const getCurrent = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user);
};

const authController = {
  signUp,
  logIn,
  getCurrent,
};

module.exports = authController;
