import { axios } from '../lib/axios';

const getUsers = async (page) => {
  return await axios.get('/users', { params: { page } });
};

const getUser = async (id) => {
  return await axios.get(`/users/${id}`);
};

const updateUser = async (id, data) => {
  return await axios.patch(`/users/${id}`, data);
};

const deleteUser = async (id) => {
  return await axios.delete(`/users/${id}`);
};

const userSerice = {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};

export default userSerice;
