import { nanoid } from 'nanoid';
import create from 'zustand';

export const useNotificationStore = create((set) => ({
  notifications: [],
  addNotification: (notification) => {
    const id = nanoid();
    setTimeout(
      () =>
        set((state) => ({
          notifications: state.notifications.filter(
            (notification) => notification.id !== id
          ),
        })),
      5000
    );
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
