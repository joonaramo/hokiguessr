const Player = require('../models/Player');
const Prediction = require('../models/Prediction');
const User = require('../models/User');
const liigaService = require('../services/liiga');

const getAll = async (req, res) => {
  const predictions = await Prediction.find({ user_id: req.user.id });
  res.json(predictions);
};

const create = async (req, res) => {
  const { pointsUsed, playerId, gameId } = req.body;
  let points_ratio = 2.0;
  const date = new Date(Date.now());
  const player = await Player.findOne({ player_id: playerId });
  if (player) {
    points_ratio = player.points_ratio;
  }
  // TODO: Get season from req.body
  const { game } = await liigaService.getGame(2022, gameId);
  if (game.started) {
    return res
      .status(400)
      .json({ message: 'Can not predict on already started game' });
  }
  const newPrediction = new Prediction({
    points_used: pointsUsed,
    points_ratio,
    player_id: playerId,
    user_id: req.user.id,
    game_id: gameId,
    created_at: date,
  });
  const user = await User.findById(req.user.id);
  if (pointsUsed > user.points) {
    return res.status(400).json({ message: 'Insufficient points' });
  }
  user.points = user.points - pointsUsed;
  await user.save();
  const prediction = await newPrediction.save();
  res.json(prediction);
};

const predictionController = {
  getAll,
  create,
};

module.exports = predictionController;
