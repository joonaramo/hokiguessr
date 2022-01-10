import { useMutation, useQueryClient } from 'react-query';
import userService from '../services/user';
import { useNotificationStore } from '../stores/notification';

export const useUpdateUser = (id) => {
  const queryClient = useQueryClient();
  const { addNotification } = useNotificationStore();
  return useMutation((data) => userService.updateUser(id, data), {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
      queryClient.invalidateQueries('user', [id]);
      addNotification({
        type: 'success',
        title: 'User updated',
      });
    },
  });
};
