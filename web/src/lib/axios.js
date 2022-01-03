import Axios from 'axios';
import { useNotificationStore } from '../stores/notification';

import { API_URL } from '../utils/constants';
import storage from '../utils/storage';

function authRequestInterceptor(config) {
  const token = storage.getToken();
  if (token) {
    config.headers.authorization = `bearer ${token}`;
  }
  config.headers.Accept = 'application/json';
  return config;
}

export const axios = Axios.create({
  baseURL: API_URL,
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const errors = error.response?.data;
    if (errors && errors.length > 0) {
      errors.forEach((error) => {
        if (!error.field) {
          const message = error.message;
          useNotificationStore.getState().addNotification({
            type: 'error',
            title: 'Error',
            message,
          });
        }
      });
    } else {
      const message = error.message;
      console.log(JSON.stringify(error));
      useNotificationStore.getState().addNotification({
        type: 'error',
        title: 'Error',
        message,
      });
    }
    return Promise.reject(error);
  }
);
