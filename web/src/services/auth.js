import { axios } from '../lib/axios';

const login = async (credentials) => {
  const data = await axios.post('/auth/login', credentials);
  return data;
};

const getCurrent = async () => {
  const data = await axios.get('/auth/me');
  return data;
};

const authService = {
  login,
  getCurrent,
};

export default authService;
