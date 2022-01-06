const User = require('../models/User');

const getAll = async (req, res) => {
  const [, users] = await User.find({});
  res.json(users);
};

const userController = {
  getAll,
};

module.exports = userController;
