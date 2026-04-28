import * as Network from 'expo-network';
import { onlineManager } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Platform } from 'react-native';

export function useOnlineManager() {
  useEffect(() => {
    // React Query already supports on reconnect auto refetch in web browser
    if (Platform.OS === 'web') return;

    onlineManager.setEventListener((setOnline) => {
      let initialised = false;

      const eventSubscription = Network.addNetworkStateListener((state) => {
        initialised = true;
        setOnline(!!state.isConnected);
      });

      Network.getNetworkStateAsync()
        .then((state) => {
          if (!initialised) {
            setOnline(!!state.isConnected);
          }
        })
        .catch(() => {
          // getNetworkStateAsync can reject on some platforms/SDK versions
        });

      return eventSubscription.remove;
    });
  }, []);
}
