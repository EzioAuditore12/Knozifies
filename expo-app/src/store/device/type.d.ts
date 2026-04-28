export type DeviceConfigStoreType = {
  lastSyncedAt: number;
  getLastSyncedAt: () => number;
  updateLastSynedAt: (data: number) => void;
  resetTimeStamp: () => void;
};
