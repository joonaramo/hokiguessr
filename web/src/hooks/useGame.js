import { useQuery } from 'react-query';
import liigaService from '../services/liiga';

export const useGame = (season, gameId) => {
  return useQuery(['game', { season, gameId }], () =>
    liigaService.getGame(season, gameId)
  );
};
