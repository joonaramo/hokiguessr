const User = require('../models/User');

/**
 * A function used to get all users
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 */
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

/**
 * A function used to get user by id
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 */
const getById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.json(user);
};

/**
 * A function used to update user's data
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 */
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

/**
 * A function used to remove a user
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 */
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
