const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getAll = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

const create = async (req, res) => {
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
      return res.json({ token });
    }
  );
};

const playerController = {
  getAll,
  create,
};

module.exports = playerController;
