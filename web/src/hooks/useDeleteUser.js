import { useMutation, useQueryClient } from 'react-query';
import userService from '../services/user';
import { useNotificationStore } from '../stores/notification';

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const { addNotification } = useNotificationStore();
  return useMutation((id) => userService.deleteUser(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
      addNotification({
        type: 'success',
        title: 'User deleted',
      });
    },
  });
};
