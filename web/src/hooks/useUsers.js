import { useQuery } from 'react-query';
import adminService from '../services/admin';

export const useUsers = (page) => {
  return useQuery(['users', page], () => adminService.getUsers(page));
};
