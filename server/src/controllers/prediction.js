const Prediction = require('../models/Prediction');

const getAll = async (req, res) => {
  const predictions = await Prediction.find();
  res.json(predictions);
};

const create = async (req, res) => {
  const { pointsUsed, pointsRatio, playerId } = req.body;
  const date = new Date(Date.now());
  const newPrediction = new Prediction({
    points_used: pointsUsed,
    points_ratio: pointsRatio,
    player_id: playerId,
    user_id: 3,
    created_at: date,
  });
  const prediction = await newPrediction.save();
  res.json(prediction);
};

const predictionController = {
  getAll,
  create,
};

module.exports = predictionController;
