'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  FC,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const NetworkContext = createContext<boolean | null>(null);

export const useNetworkDetector = () => {
  const network = useContext(NetworkContext);

  if (network === null) {
    throw new Error(
      'useNetworkDetector must be used within a NetworkDetectorProvider',
    );
  }

  return network;
};

interface INetworkDetectorProviderProps {
  children: ReactNode;
}

export const NetworkDetectorProvider: FC<INetworkDetectorProviderProps> = ({
  children,
}) => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  useEffect(() => {
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  return (
    <NetworkContext.Provider value={isOnline}>
      {children}
      <AnimatePresence>
        {!isOnline && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={cn(
              'fixed top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-red-600 text-white rounded-md shadow-md',
            )}
          >
            You are offline. Check your internet connection.
          </motion.div>
        )}
      </AnimatePresence>
    </NetworkContext.Provider>
  );
};
