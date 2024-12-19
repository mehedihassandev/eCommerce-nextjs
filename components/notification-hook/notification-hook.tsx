'use client';

import { createContext, useCallback, useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

// Define the NotificationContext type
type NotificationContextType = (
  message: string,
  type: 'success' | 'error',
) => void;

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      'useNotification must be used within a NotificationProvider',
    );
  }
  return context;
};

interface NotificationProviderProps {
  children: React.ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<
    { id: string; message: string; type: 'success' | 'error' }[]
  >([]);

  const showNotification: NotificationContextType = useCallback(
    (message, type) => {
      const id = Math.random().toString(36).substr(2, 9);
      setNotifications((prev) => [...prev, { id, message, type }]);
      setTimeout(() => {
        setNotifications((prev) =>
          prev.filter((notification) => notification.id !== id),
        );
      }, 5000); // Auto-remove after 5 seconds
    },
    [],
  );

  return (
    <NotificationContext.Provider value={showNotification}>
      {children}
      <div className="fixed top-20 left-1/2 transform -translate-x-1/2 space-y-2 z-[99999999]">
        <AnimatePresence>
          {notifications.map(({ id, message, type }) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={cn(
                'px-4 py-2 rounded-md shadow-md',
                type === 'success'
                  ? 'bg-green-500 text-white'
                  : 'bg-red-500 text-white',
              )}
            >
              {message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  );
};
