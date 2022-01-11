import { useMutation, useQueryClient } from 'react-query';
import adminService from '../services/admin';
import { useNotificationStore } from '../stores/notification';

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const { addNotification } = useNotificationStore();
  return useMutation((id) => adminService.deleteUser(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
      addNotification({
        type: 'success',
        title: 'User deleted',
      });
    },
  });
};
