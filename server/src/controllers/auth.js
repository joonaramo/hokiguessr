const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signUp = async (req, res) => {
  const { username, password } = req.body;
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
    console.log('invalid credentials');
    return res.status(400).json({ error: 'invalid credentials' });
  }
  const passwordCorrect = await bcrypt.compare(password, user.password);
  if (!passwordCorrect) {
    console.log('invalid credentials');
    return res.status(400).json({ error: 'invalid credentials' });
  }
  const payload = {
    user: {
      id: user.id,
      username: user.username,
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
  try {
    let user = await User.findById(req.user.id);
    user = user.select('-password');
    res.json(user);
  } catch (err) {
    return res.status(400).json({ error: 'Invalid request' });
  }
};

const authController = {
  signUp,
  logIn,
  getCurrent,
};

module.exports = authController;
