import { axios } from '../lib/axios';

const login = async (credentials) => {
  return await axios.post('/auth/login', credentials);
};

const signup = async (data) => {
  return await axios.post('/auth/signup', data);
};

const getCurrent = async () => {
  const data = await axios.get('/auth/me');
  return data;
};

const authService = {
  login,
  signup,
  getCurrent,
};

export default authService;
