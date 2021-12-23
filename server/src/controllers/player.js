const Player = require('../models/Player');

const getAll = async (req, res) => {
  const players = await Player.find();
  res.json(players);
};

const create = async (req, res) => {
  const { playerId, pointsRatio } = req.body;
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
