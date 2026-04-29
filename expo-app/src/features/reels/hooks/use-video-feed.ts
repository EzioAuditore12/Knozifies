import { useCallback, useEffect, useState } from 'react';
import { Platform } from 'react-native';

import { Video } from '../types';

const CYCLE_COUNT = Platform.OS === 'android' ? 10 : 20;

const useVideoFeed = (urls: string[]) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVideos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const videoList = Array.from({ length: CYCLE_COUNT }).flatMap(
        (_, cycleIndex) =>
          urls.map((url, index) => ({
            id: `${cycleIndex}-${index}`,
            url,
          })),
      );

      setVideos(videoList);
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  }, [urls]);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  return {
    videos,
    loading,
    error,
    refetch: fetchVideos,
  };
};

export default useVideoFeed;
