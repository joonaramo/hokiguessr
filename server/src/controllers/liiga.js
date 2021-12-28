const liigaService = require('../services/liiga');

const getPlayers = async (req, res) => {
  const { teamId } = req.query;
  const players = await liigaService.getPlayers(teamId);
  res.json(players);
};

const getTeams = async (req, res) => {
  const teams = await liigaService.getTeams();
  res.json(teams);
};

const getLiveGames = async (req, res) => {
  const games = await liigaService.getLiveGames();
  res.json(games);
};

const liigaController = {
  getPlayers,
  getTeams,
  getLiveGames,
};

module.exports = liigaController;
