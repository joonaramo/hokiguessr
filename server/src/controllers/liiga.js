const liigaService = require('../services/liiga');

/**
 * A function used to get all players
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 */
const getPlayers = async (req, res) => {
  const { teamId } = req.query;
  const players = await liigaService.getPlayers(teamId);
  res.json(players);
};

/**
 * A function used to get all teams
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 */
const getTeams = async (req, res) => {
  const teams = await liigaService.getTeams();
  res.json(teams);
};

/**
 * A function used to get all live games
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 */
const getLiveGames = async (req, res) => {
  const games = await liigaService.getLiveGames();
  res.json(games);
};

/**
 * A function used to get all games
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 */
const getGames = async (req, res) => {
  const games = await liigaService.getGames();
  res.json(games);
};

/**
 * A function used to get a single game
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 */
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
