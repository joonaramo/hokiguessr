const Player = require('../models/Player');
const FieldError = require('../utils/errors');

const getAll = async (req, res) => {
  const players = await Player.find();
  res.json(players);
};

const create = async (req, res) => {
  const { playerId, pointsRatio } = req.body;
  const foundPlayer = await Player.findOne({ player_id: playerId });
  if (foundPlayer) {
    const e = new FieldError(
      'Player with that ID is already created',
      'playerId'
    );
    e.name = 'FOUND_PLAYER_ERROR';
    throw e;
  }
  const newPlayer = new Player({
    player_id: playerId,
    points_ratio: pointsRatio,
  });
  const player = await newPlayer.save();
  res.json(player);
};

const playerController = {
  getAll,
  create,
};

module.exports = playerController;
