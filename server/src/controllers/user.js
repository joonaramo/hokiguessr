const User = require('../models/User');
const bcrypt = require('bcrypt');

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
  res.json(user);
};

const playerController = {
  getAll,
  create,
};

module.exports = playerController;
