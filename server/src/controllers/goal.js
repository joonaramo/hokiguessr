const Goal = require('../models/Goal');

const getAll = async (req, res) => {
  const goals = await Goal.find();
  res.json(goals);
};

const create = async (req, res) => {
  const { playerId, eventId } = req.body;
  const date = new Date(Date.now());
  const newGoal = new Goal({ playerId, eventId, date });
  const goal = await newGoal.save();
  res.json(goal);
};

const playerController = {
  getAll,
  create,
};

module.exports = playerController;
