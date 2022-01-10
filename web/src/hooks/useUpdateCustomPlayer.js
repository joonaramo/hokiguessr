import { useMutation, useQueryClient } from 'react-query';
import playerService from '../services/player';
import { useNotificationStore } from '../stores/notification';

export const useUpdateCustomPlayer = (id) => {
  const queryClient = useQueryClient();
  const { addNotification } = useNotificationStore();
  return useMutation((data) => playerService.updatePlayer(id, data), {
    onSuccess: () => {
      queryClient.invalidateQueries('customPlayers');
      addNotification({
        type: 'success',
        title: 'Player updated',
      });
    },
  });
};
