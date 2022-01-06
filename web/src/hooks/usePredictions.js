import { useQuery } from 'react-query';
import predictionService from '../services/prediction';
import { useNotificationStore } from '../stores/notification';
import { usePlayers } from './usePlayers';

export const usePredictions = (page, active) => {
  const { addNotification } = useNotificationStore();
  const playersQuery = usePlayers();

  let key = ['predictions', page];
  if (active) {
    key = ['predictions', 'active'];
  }
  return useQuery(key, () => predictionService.getPredictions(page, active), {
    keepPreviousData: true,
    onSuccess: (data) => {
      // Show notification if there is a new, unseen correct prediction
      const { predictions } = data;
      const correctPredictions = predictions.filter(
        (prediction) => prediction.correct && !prediction.notification_seen
      );
      correctPredictions.forEach((prediction) => {
        const player = playersQuery.data.find(
          (player) => player.id === prediction.player_id
        );
        const playerName = `${player.lastName} ${player.firstName}`;
        addNotification(
          {
            type: 'success',
            title: 'You predicted correctly!',
            message: `${playerName} scored a goal!`,
          },
          0
        );
        predictionService.updatePrediction(prediction.id, {
          notification_seen: true,
        });
      });
    },
  });
};
