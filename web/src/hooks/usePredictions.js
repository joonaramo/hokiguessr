import { useQuery, useQueryClient } from 'react-query';
import predictionService from '../services/prediction';
import { useNotificationStore } from '../stores/notification';
import { usePlayers } from './usePlayers';

export const useHandleCorrectPredictions = () => {
  const { addNotification } = useNotificationStore();
  const playersQuery = usePlayers();
  function handlePredictions(predictions) {
    // Get all unseen correct predictions
    const unseenPredictions = predictions.filter(
      (prediction) => !prediction.notification_seen
    );

    // Show a notification for each unseen prediction and set the status to seen
    unseenPredictions.forEach((prediction) => {
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
  }
  return { handlePredictions };
};

export const usePredictions = (page, active) => {
  const { handlePredictions } = useHandleCorrectPredictions();
  let key = ['predictions', page];
  if (active) {
    key = ['predictions', 'active'];
  }
  return useQuery(key, () => predictionService.getPredictions(page, active), {
    keepPreviousData: true,
    onSuccess: (data) => {
      handlePredictions(data.predictions.filter((p) => p.correct));
    },
  });
};
