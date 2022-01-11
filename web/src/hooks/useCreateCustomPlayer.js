import { useMutation, useQueryClient } from 'react-query';
import adminService from '../services/admin';
import { useNotificationStore } from '../stores/notification';

export const useCreateCustomPlayer = () => {
  const queryClient = useQueryClient();
  const { addNotification } = useNotificationStore();
  return useMutation((data) => adminService.createPlayer(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('customPlayers');
      addNotification({
        type: 'success',
        title: 'Player created',
      });
    },
  });
};
