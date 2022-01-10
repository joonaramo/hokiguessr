const Player = require('../models/Player');
const FieldError = require('../utils/errors');

const getAll = async (req, res) => {
  const { page = 1 } = req.query;
  const limit = 10;
  const offset = (page - 1) * limit;

  const [total, players] = await Player.find({}, limit, offset);
  res.json({
    paging: {
      total,
      limit,
      offset: offset + 1,
      hasMore: offset + limit < total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
    },
    players,
  });
};

const getById = async (req, res) => {
  const { id } = req.params;
  const player = await Player.findById(id);
  res.json(player);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { pointsRatio } = req.body;
  const player = await Player.findByIdAndUpdate(id, {
    points_ratio: pointsRatio,
  });
  res.json(player);
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

const remove = async (req, res) => {
  const { id } = req.params;
  await Player.deleteById(id);
  res.status(204).end();
};

const playerController = {
  getAll,
  getById,
  update,
  create,
  remove,
};

module.exports = playerController;
