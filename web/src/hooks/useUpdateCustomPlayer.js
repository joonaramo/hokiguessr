import { useMutation, useQueryClient } from 'react-query';
import adminService from '../services/admin';
import { useNotificationStore } from '../stores/notification';

export const useUpdateCustomPlayer = (id) => {
  const queryClient = useQueryClient();
  const { addNotification } = useNotificationStore();
  return useMutation((data) => adminService.updatePlayer(id, data), {
    onSuccess: () => {
      queryClient.invalidateQueries('customPlayers');
      addNotification({
        type: 'success',
        title: 'Player updated',
      });
    },
  });
};
