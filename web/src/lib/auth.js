import { initReactQueryAuth } from 'react-query-auth';
import { Spinner } from '../components/Spinner';
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
  const data = await authService.signup(userData);
  const user = await handleUserResponse(data);
  return user;
};

const logoutFn = async () => {
  storage.clearToken();
  window.location.assign(window.location.origin + '/login');
};

const authConfig = {
  loadUser,
  loginFn,
  registerFn,
  logoutFn,
  LoaderComponent() {
    return (
      <div className='w-screen h-screen flex justify-center items-center'>
        <Spinner size='xl' />
      </div>
    );
  },
};

export const { AuthProvider, useAuth } = initReactQueryAuth(authConfig);
