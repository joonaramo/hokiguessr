import { useMutation, useQueryClient } from 'react-query';
import predictionService from '../services/prediction';
import { useNotificationStore } from '../stores/notification';

export const useCreatePrediction = () => {
  const queryClient = useQueryClient();
  const { addNotification } = useNotificationStore();
  return useMutation((data) => predictionService.createPrediction(data), {
    onMutate: async () => {
      await queryClient.cancelQueries('predictions');

      const previousPredictions = queryClient.getQueryData('predictions');

      return { previousPredictions };
    },
    onSuccess: (data) => {
      const previousPredictions = queryClient.getQueryData('predictions');

      queryClient.setQueryData('predictions', [
        ...(previousPredictions || []),
        data,
      ]);
      addNotification({
        type: 'success',
        title: 'Prediction created',
      });
    },
  });
};
