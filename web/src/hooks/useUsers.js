import { useQuery } from 'react-query';
import userService from '../services/user';

export const useUsers = (page) => {
  return useQuery(['users', page], () => userService.getUsers(page));
};
