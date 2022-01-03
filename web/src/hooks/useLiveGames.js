import { useQuery, useQueryClient } from 'react-query';
import liigaService from '../services/liiga';
import { useNotificationStore } from '../stores/notification';

export const useLiveGames = (getPlayerName) => {
  const { addNotification } = useNotificationStore();
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
          addNotification({
            type: 'info',
            title: 'New goal scored!',
            message: `Player: ${getPlayerName(goal.scorerPlayerId)}`,
          });
        });
      }
    },
  });
};
