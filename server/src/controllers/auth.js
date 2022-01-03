const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const FieldError = require('../utils/errors');

const signUp = async (req, res) => {
  const { username, password } = req.body;

  const foundUser = await User.findOne({ username });

  if (foundUser) {
    const e = new FieldError('This username is already taken', 'username');
    e.name = 'USERNAME_TAKEN_ERROR';
    throw e;
  }

  const date = new Date(Date.now());
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const newUser = new User({
    username,
    password: hash,
    points: 100,
    is_admin: 0,
    created_at: date,
    updated_at: date,
  });

  const user = await newUser.save();

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

const logIn = async (req, res) => {
  const { username, password } = req.body;
  let user = await User.findOne({ username });
  if (!user) {
    const e = new Error('Wrong username or password');
    e.name = 'INVALID_CREDENTIALS_ERROR';
    throw e;
  }
  const passwordCorrect = await bcrypt.compare(password, user.password);
  if (!passwordCorrect) {
    const e = new Error('Wrong username or password');
    e.name = 'INVALID_CREDENTIALS_ERROR';
    throw e;
  }
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
