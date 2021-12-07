const Player = require('../models/Player');

const getAll = async (req, res) => {
  const players = await Player.find();
  res.json(players);
};

const playerController = {
  getAll,
};

module.exports = playerController;
