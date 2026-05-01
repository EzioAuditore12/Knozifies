import { View } from 'react-native';
import { VideoFeedList } from '@/features/reels/components';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MetricsProvider } from '@/features/reels/contexts/metrics.context';
import { SeekProvider } from '@/features/reels/contexts/seek.context';

const CUSTOM_SOURCES = [
  'https://nyc.cloud.appwrite.io/v1/storage/buckets/69f0430f001da570cbf8/files/69f21c4e0009a6152679/view?project=680b6f66001ec729c4e0',
  'https://nyc.cloud.appwrite.io/v1/storage/buckets/69f0430f001da570cbf8/files/69f21c630018782a33d3/view?project=680b6f66001ec729c4e0',
  'https://nyc.cloud.appwrite.io/v1/storage/buckets/69f0430f001da570cbf8/files/69f21c740015d6b5b83d/view?project=680b6f66001ec729c4e0',
];

export default function ReelScreen() {
  return (
    <SafeAreaProvider>
      <MetricsProvider>
        <SeekProvider>
          <View className="flex-1 bg-black">
            <VideoFeedList urls={CUSTOM_SOURCES} />
          </View>
        </SeekProvider>
      </MetricsProvider>
    </SafeAreaProvider>
  );
}
