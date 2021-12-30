import { axios } from '../lib/axios';

const getLiveGames = async () => {
  return await axios.get('/liiga/games/live');
};

const getGames = async () => {
  return await axios.get('/liiga/games');
};

const getGame = async (season, gameId) => {
  return await axios.get(`/liiga/games/${season}/${gameId}`);
};

const getPlayers = async (teamId) => {
  return await axios.get('/liiga/players', { params: { teamId } });
};

const getTeams = async () => {
  return await axios.get('/liiga/teams');
};

const liigaService = {
  getLiveGames,
  getGames,
  getGame,
  getPlayers,
  getTeams,
};

export default liigaService;
