import { useQuery, useQueryClient } from 'react-query';
import liigaService from '../services/liiga';
import { useNotificationStore } from '../stores/notification';
import { usePlayers } from './usePlayers';
import { useHandleCorrectPredictions } from './usePredictions';

export const useLiveGames = () => {
  const { addNotification } = useNotificationStore();
  const { handlePredictions } = useHandleCorrectPredictions();

  const playersQuery = usePlayers();
  const queryClient = useQueryClient();
  const prevData = queryClient.getQueryData('liveGames');
  const predictionsData = queryClient.getQueryData(['predictions', 'active']);

  return useQuery('liveGames', liigaService.getLiveGames, {
    onSuccess: (data) => {
      if (prevData) {
        // Add all goals from query to goals array
        let goals = [];
        data.forEach((game) => {
          const homeGoalEvents = game.homeTeam.goalEvents;
          goals = goals.concat(homeGoalEvents);
          const awayGoalEvents = game.awayTeam.goalEvents;
          goals = goals.concat(awayGoalEvents);
        });

        // Add all previous goals to oldGoals array
        let oldGoals = [];
        prevData.forEach((game) => {
          const homeGoalEvents = game.homeTeam.goalEvents;
          oldGoals = oldGoals.concat(homeGoalEvents);
          const awayGoalEvents = game.awayTeam.goalEvents;
          oldGoals = oldGoals.concat(awayGoalEvents);
        });

        // Check which of the goals in the current query were not on the old query
        const newGoals = goals.filter(
          (goal) =>
            !JSON.stringify(oldGoals).includes(`"eventId":${goal.eventId}`) &&
            !goal.goalTypes.includes('VL')
        );

        let correctPredictions = [];
        // Show notification for each new goal
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

          // Add correct predictions for this goal to correctPredictions array
          const goalPredictions = predictionsData.predictions.filter(
            (p) => !p.completed && p.player_id === goal.scorerPlayerId
          );
          correctPredictions = correctPredictions.concat(goalPredictions);
        });

        // Handle correct predictions
        if (correctPredictions.length > 0) {
          handlePredictions(correctPredictions);
        }
      }
    },
  });
};
