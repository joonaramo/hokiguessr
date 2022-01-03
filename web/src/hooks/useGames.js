import { useQuery } from 'react-query';
import liigaService from '../services/liiga';

export const useGames = () => {
  return useQuery('games', liigaService.getGames);
};
