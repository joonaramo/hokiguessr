const User = require('../models/User');

const getAll = async (req, res) => {
  const { page = 1 } = req.query;
  const limit = 10;
  const offset = (page - 1) * limit;

  const [total, users] = await User.find({}, limit, offset);
  res.json({
    paging: {
      total,
      limit,
      offset: offset + 1,
      hasMore: offset + limit < total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
    },
    users,
  });
};

const getById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.json(user);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { username, points, is_admin } = req.body;
  const user = await User.findByIdAndUpdate(id, {
    username,
    points,
    is_admin,
    updated_at: new Date(Date.now),
  });
  res.json(user);
};

const remove = async (req, res) => {
  const { id } = req.params;
  await User.deleteById(id);
  res.status(204).end();
};

const userController = {
  getAll,
  getById,
  update,
  remove,
};

module.exports = userController;
