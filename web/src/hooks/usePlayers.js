import { useQuery } from 'react-query';
import liigaService from '../services/liiga';

export const usePlayers = (teamId) => {
  return useQuery('players', () => liigaService.getPlayers(teamId));
};
