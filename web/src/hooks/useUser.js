import { useQuery } from 'react-query';
import adminService from '../services/admin';

export const useUser = (id) => {
  return useQuery(['user', id], () => adminService.getUser(id));
};
