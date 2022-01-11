import { axios } from '../lib/axios';

const getUsers = async (page) => {
  return await axios.get('/admin/users', { params: { page } });
};

const getUser = async (id) => {
  return await axios.get(`/admin/users/${id}`);
};

const updateUser = async (id, data) => {
  return await axios.patch(`/admin/users/${id}`, data);
};

const deleteUser = async (id) => {
  return await axios.delete(`/admin/users/${id}`);
};

const getPredictions = async (page) => {
  return await axios.get('/admin/predictions', { params: { page } });
};

const createPlayer = async (data) => {
  return await axios.post('/admin/players', data);
};

const updatePlayer = async (id, data) => {
  return await axios.patch(`/admin/players/${id}`, data);
};

const deletePlayer = async (id) => {
  return await axios.delete(`/admin/players/${id}`);
};

const adminService = {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getPredictions,
  createPlayer,
  updatePlayer,
  deletePlayer,
};

export default adminService;
