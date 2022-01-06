import { axios } from '../lib/axios';

const getPlayers = async (page) => {
  return await axios.get('/players', { params: { page } });
};

const createPlayer = async (data) => {
  return await axios.post('/players', data);
};

const updatePlayer = async (id, data) => {
  return await axios.patch(`/players/${id}`, data);
};

const playerService = {
  getPlayers,
  createPlayer,
  updatePlayer,
};

export default playerService;
