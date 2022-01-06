import { useMutation, useQueryClient } from 'react-query';
import predictionService from '../services/prediction';
import { useNotificationStore } from '../stores/notification';

export const useCreatePrediction = () => {
  const queryClient = useQueryClient();
  const { addNotification } = useNotificationStore();
  return useMutation((data) => predictionService.createPrediction(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('predictions');
      queryClient.invalidateQueries('auth-user');
      addNotification({
        type: 'success',
        title: 'Prediction created',
      });
    },
  });
};
