import { useQuery } from 'react-query';
import playerService from '../services/player';

export const useCustomPlayers = (page) => {
  return useQuery('customPlayers', () => playerService.getPlayers(page));
};
