import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { zustandStorage } from '../storage';
import type { DeviceConfigStoreType } from './type';

export const useDeviceConfigStore = create<DeviceConfigStoreType>()(
  persist(
    (set, get) => ({
      lastSyncedAt: 0,
      getLastSyncedAt() {
        const { lastSyncedAt } = get();
        return lastSyncedAt;
      },
      updateLastSynedAt(data) {
        set({ lastSyncedAt: data });
      },
      resetTimeStamp() {
        set({ lastSyncedAt: 0 });
      },
    }),
    {
      name: 'device-settings',
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);
