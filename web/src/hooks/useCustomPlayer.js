import { useQuery } from 'react-query';
import playerService from '../services/player';

export const useCustomPlayer = (id) => {
  return useQuery(['customPlayer', id], () => playerService.getPlayer(id));
};
