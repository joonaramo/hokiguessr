const Player = require('../models/Player');
const Prediction = require('../models/Prediction');
const User = require('../models/User');
const liigaService = require('../services/liiga');
const FieldError = require('../utils/errors');

/**
 * A function used to get all predictions from currently logged in user
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 */
const getAllFromUser = async (req, res) => {
  const { page = 1, active } = req.query;
  const limit = 10;
  const offset = (page - 1) * limit;
  const [total, predictions] = await Prediction.find(
    { user_id: req.user.id },
    limit,
    offset,
    active
  );
  let stats;

  // Get correct predictions only on the first page so we don't make additional
  // SQL queries each time user changes a page
  if (parseInt(page) === 1) {
    const [totalCorrect, correctPredictions] = await Prediction.find({
      user_id: req.user.id,
      correct: true,
    });
    const pointsWonReducer = (previousValue, currentValue) =>
      previousValue +
      currentValue.points_used * currentValue.points_ratio -
      currentValue.points_used;
    stats = {
      correct: totalCorrect,
      pointsWon: correctPredictions.reduce(pointsWonReducer, 0),
    };
  }

  res.json({
    paging: {
      total,
      limit,
      offset: offset + 1,
      hasMore: offset + limit < total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
    },
    predictions,
    stats,
  });
};

/**
 * A function used to get all predictions
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 */
const getAll = async (req, res) => {
  const { page = 1, active } = req.query;
  const limit = 10;
  const offset = (page - 1) * limit;
  const [total, predictions] = await Prediction.find({}, limit, offset, active);

  res.json({
    paging: {
      total,
      limit,
      offset: offset + 1,
      hasMore: offset + limit < total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
    },
    predictions,
  });
};

/**
 * A function used to create a new prediction
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 */
const create = async (req, res) => {
  const { pointsUsed, playerId, gameId } = req.body;

  // TODO: Get season from req.body
  const { game } = await liigaService.getGame(2022, gameId);

  // Check that game does exist and that it hasn't been started yet
  if (!game) {
    const e = new Error("Game with that id can't be found");
    e.name = 'GAME_NOT_FOUND_ERROR';
    throw e;
  }
  if (game.started) {
    const e = new Error('Can not predict on already started game');
    e.name = 'GAME_STARTED_ERROR';
    throw e;
  }

  // Give some default values to prediction
  let points_ratio = 2.0;
  const date = new Date(Date.now());

  // If players is found in db with custom points ratio, change it to that value
  const player = await Player.findOne({ player_id: playerId });
  if (player) {
    points_ratio = player.points_ratio;
  }

  // Check if user has already predicted this player's goal on this game
  let prediction = await Prediction.findOne({
    user_id: req.user.id,
    player_id: playerId,
    game_id: gameId,
  });

  // If prediction was found, increase the points used. Otherwise create a new prediction.
  if (prediction) {
    prediction.points_used = prediction.points_used + pointsUsed;
  } else {
    prediction = new Prediction({
      points_used: pointsUsed,
      points_ratio,
      player_id: playerId,
      user_id: req.user.id,
      game_id: gameId,
      created_at: date,
    });
  }

  // Check that user has enough points and subtract that amount from user
  const user = await User.findById(req.user.id);
  if (pointsUsed > user.points) {
    const e = new FieldError(
      "You don't have enough points to predict this amount",
      'pointsUsed'
    );
    e.name = 'INSUFFICIENT_POINTS_ERROR';
    throw e;
  }
  user.points = user.points - pointsUsed;

  // Save user and prediction, return new or updated prediction
  await user.save();
  prediction = await prediction.save();
  res.json(prediction);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { notification_seen } = req.body;
  const prediction = await Prediction.findByIdAndUpdate(id, {
    notification_seen,
  });
  res.json(prediction);
};

const predictionController = {
  getAllFromUser,
  getAll,
  create,
  update,
};

module.exports = predictionController;
