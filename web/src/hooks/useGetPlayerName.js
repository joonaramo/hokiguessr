import { usePlayers } from './usePlayers';

export const useGetPlayerName = (playerId) => {
  const playersQuery = usePlayers();
  if (!playersQuery.isLoading) {
    const player = playersQuery.data.find((player) => player.id === playerId);
    return `${player.lastName} ${player.firstName}`;
  }
};
