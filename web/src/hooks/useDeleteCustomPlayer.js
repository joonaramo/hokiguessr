import { useMutation, useQueryClient } from 'react-query';
import adminService from '../services/admin';
import { useNotificationStore } from '../stores/notification';

export const useDeleteCustomPlayer = () => {
  const queryClient = useQueryClient();
  const { addNotification } = useNotificationStore();
  return useMutation((id) => adminService.deletePlayer(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('customPlayers');
      addNotification({
        type: 'success',
        title: 'Player deleted',
      });
    },
  });
};
