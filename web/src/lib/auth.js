import { initReactQueryAuth } from 'react-query-auth';
import authService from '../services/auth';
import storage from '../utils/storage';

const handleUserResponse = async (data) => {
  const { token, user } = data;
  storage.setToken(token);
  return user;
};

const loadUser = async () => {
  if (storage.getToken()) {
    const data = await authService.getCurrent();
    return data;
  }
  return null;
};

const loginFn = async (credentials) => {
  const data = await authService.login(credentials);
  const user = await handleUserResponse(data);
  return user;
};

const registerFn = async (userData) => {
  console.log('register', userData);
};

const logoutFn = async () => {
  storage.clearToken();
};

const authConfig = {
  loadUser,
  loginFn,
  registerFn,
  logoutFn,
};

export const { AuthProvider, useAuth } = initReactQueryAuth(authConfig);
