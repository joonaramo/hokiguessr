const Player = require('../models/Player');
const Prediction = require('../models/Prediction');
const User = require('../models/User');

const getAll = async (req, res) => {
  const predictions = await Prediction.find();
  res.json(predictions);
};

const create = async (req, res) => {
  const { pointsUsed, playerId } = req.body;
  let points_ratio = 2.0;
  const date = new Date(Date.now());
  const player = await Player.findOne({ player_id: playerId });
  if (player) {
    points_ratio = player.points_ratio;
  }
  const newPrediction = new Prediction({
    points_used: pointsUsed,
    points_ratio,
    player_id: playerId,
    user_id: req.user.id,
    created_at: date,
  });
  const user = await User.findById(req.user.id);
  if (pointsUsed > user.points) {
    return res.status(400).json({ error: 'Insufficient points' });
  }
  user.points = user.points - pointsUsed;
  const prediction = await newPrediction.save();
  res.json(prediction);
};

const predictionController = {
  getAll,
  create,
};

module.exports = predictionController;
