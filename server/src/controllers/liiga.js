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

const getGames = async (req, res) => {
  const games = await liigaService.getGames();
  res.json(games);
};

const getGame = async (req, res) => {
  const { season, gameId } = req.params;
  const game = await liigaService.getGame(season, gameId);
  res.json(game);
};

const liigaController = {
  getPlayers,
  getTeams,
  getLiveGames,
  getGames,
  getGame,
};

module.exports = liigaController;
