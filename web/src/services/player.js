import { axios } from '../lib/axios';

const getPlayers = async (page) => {
  return await axios.get('/players', { params: { page } });
};

const createPlayer = async (data) => {
  return await axios.post('/players', data);
};

const getPlayer = async (id) => {
  return await axios.get(`/players/${id}`);
};

const updatePlayer = async (id, data) => {
  return await axios.patch(`/players/${id}`, data);
};

const deletePlayer = async (id) => {
  return await axios.delete(`/players/${id}`);
};

const playerService = {
  getPlayers,
  getPlayer,
  createPlayer,
  updatePlayer,
  deletePlayer,
};

export default playerService;
