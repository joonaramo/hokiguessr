import { useQuery } from 'react-query';
import liigaService from '../services/liiga';

export const useTeams = () => {
  return useQuery('teams', liigaService.getTeams);
};
