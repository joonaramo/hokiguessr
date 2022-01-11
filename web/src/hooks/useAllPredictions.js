import { useQuery } from 'react-query';
import adminService from '../services/admin';

export const useAllPredictions = (page) => {
  let key = ['allPredictions', page];
  return useQuery(key, () => adminService.getPredictions(page));
};
