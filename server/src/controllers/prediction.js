const Prediction = require('../models/Prediction');
const UserPrediction = require('../models/UserPrediction');

const getAll = async (req, res) => {
  const predictions = await Prediction.find();
  res.json(predictions);
};

const create = async (req, res) => {
  const { pointsUsed, pointsRatio } = req.body;
  const date = new Date(Date.now());
  const newPrediction = new Prediction({
    pointsUsed,
    pointsRatio,
    userId: 3,
    created_at: date,
  });
  const prediction = await newPrediction.save();
  const newUserPrediction = new UserPrediction({
    userId: 3,
    predictionId: prediction.id,
  });
  await newUserPrediction.save();
  res.json(prediction);
};

const predictionController = {
  getAll,
  create,
};

module.exports = predictionController;
