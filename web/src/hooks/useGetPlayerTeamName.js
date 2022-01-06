import { usePlayers } from './usePlayers';

export const useGetPlayerTeamName = (playerId) => {
  const playersQuery = usePlayers();
  if (!playersQuery.isLoading) {
    const player = playersQuery.data.find((player) => player.id === playerId);
    return player.teamId.split(':')[1].toUpperCase();
  }
};
