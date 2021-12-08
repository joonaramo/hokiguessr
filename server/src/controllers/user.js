const User = require('../models/User');

const getAll = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

const playerController = {
  getAll,
};

module.exports = playerController;
