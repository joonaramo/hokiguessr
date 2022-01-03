const Player = require('../models/Player');

const getAll = async (req, res, next) => {
  try {
    const players = await Player.find();
    res.json(players);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const { playerId, pointsRatio } = req.body;
    const foundPlayer = await Player.findOne({ player_id: playerId });
    if (foundPlayer) {
      return next({
        name: 'FOUND_PLAYER_ERROR',
        message: 'Player with that ID is already created',
      });
    }
    const newPlayer = new Player({
      player_id: playerId,
      points_ratio: pointsRatio,
    });
    const player = await newPlayer.save();
    res.json(player);
  } catch (err) {
    next(err);
  }
};

const playerController = {
  getAll,
  create,
};

module.exports = playerController;
