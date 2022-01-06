import { useQuery, useQueryClient } from 'react-query';
import liigaService from '../services/liiga';
import { useNotificationStore } from '../stores/notification';
import { usePlayers } from './usePlayers';

export const useLiveGames = () => {
  const { addNotification } = useNotificationStore();
  const playersQuery = usePlayers();
  const queryClient = useQueryClient();
  const prevData = queryClient.getQueryData('liveGames');

  return useQuery('liveGames', liigaService.getLiveGames, {
    onSuccess: (data) => {
      if (prevData) {
        let goals = [];
        data.forEach((game) => {
          const homeGoalEvents = game.homeTeam.goalEvents;
          goals = goals.concat(homeGoalEvents);
          const awayGoalEvents = game.awayTeam.goalEvents;
          goals = goals.concat(awayGoalEvents);
        });
        let oldGoals = [];
        prevData.forEach((game) => {
          const homeGoalEvents = game.homeTeam.goalEvents;
          oldGoals = oldGoals.concat(homeGoalEvents);
          const awayGoalEvents = game.awayTeam.goalEvents;
          oldGoals = oldGoals.concat(awayGoalEvents);
        });
        const newGoals = goals.filter(
          (goal) =>
            !JSON.stringify(oldGoals).includes(`"eventId":${goal.eventId}`) &&
            !goal.goalTypes.includes('VL')
        );
        newGoals.forEach((goal) => {
          const player = playersQuery.data.find(
            (player) => player.id === goal.scorerPlayerId
          );
          const playerName = `${player.lastName} ${player.firstName}`;
          addNotification({
            type: 'info',
            title: 'New goal scored!',
            message: `Player: ${playerName}`,
          });
        });
      }
    },
  });
};
