const Goal = require('../models/Goal');

/**
 * A function used to get all goals
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 */
const getAll = async (req, res) => {
  const [, goals] = await Goal.find({});
  res.json(goals);
};

/**
 * A function used to create a new goal
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 */
const create = async (req, res) => {
  const { playerId, eventId } = req.body;
  const date = new Date(Date.now());
  const newGoal = new Goal({ player_id: playerId, event_id: eventId, date });
  const goal = await newGoal.save();
  res.json(goal);
};

const goalController = {
  getAll,
  create,
};

module.exports = goalController;
