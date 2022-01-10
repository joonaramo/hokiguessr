import { useQuery } from 'react-query';
import userService from '../services/user';

export const useUser = (id) => {
  return useQuery(['user', id], () => userService.getUser(id));
};
