import { axios } from '../lib/axios';

const getPlayers = async (page) => {
  return await axios.get('/players', { params: { page } });
};

const getPlayer = async (id) => {
  return await axios.get(`/players/${id}`);
};

const playerService = {
  getPlayers,
  getPlayer,
};

export default playerService;
