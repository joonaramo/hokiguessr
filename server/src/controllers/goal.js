const Goal = require('../models/Goal');

const getAll = async (req, res) => {
  const goals = await Goal.find();
  res.json(goals);
};

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
