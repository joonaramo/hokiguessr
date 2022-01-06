import { nanoid } from 'nanoid';
import create from 'zustand';

export const useNotificationStore = create((set) => ({
  notifications: [],
  addNotification: (notification, timeout = 5000) => {
    const id = nanoid();
    if (timeout !== 0) {
      setTimeout(
        () =>
          set((state) => ({
            notifications: state.notifications.filter(
              (notification) => notification.id !== id
            ),
          })),
        timeout
      );
    }
    set((state) => ({
      notifications: [...state.notifications, { id, ...notification }],
    }));
  },
  dismissNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter(
        (notification) => notification.id !== id
      ),
    })),
}));
