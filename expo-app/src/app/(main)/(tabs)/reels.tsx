import { StyleSheet, View } from 'react-native';
import { VideoFeedList } from '@/features/reels/components';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { MetricsProvider } from '@/features/reels/contexts/metrics.context';
import { SeekProvider } from '@/features/reels/contexts/seek.context';
import { useFPSMonitor } from '@/features/reels/hooks/use-fps-monitor';

const CUSTOM_SOURCES = [
  'https://nyc.cloud.appwrite.io/v1/storage/buckets/69f0430f001da570cbf8/files/69f043240004be185aff/view?project=680b6f66001ec729c4e0',
  'https://nyc.cloud.appwrite.io/v1/storage/buckets/69f0430f001da570cbf8/files/69f04354000d4ea0adc2/view?project=680b6f66001ec729c4e0',
  'https://nyc.cloud.appwrite.io/v1/storage/buckets/69f0430f001da570cbf8/files/69f044170017af1787ba/view?project=680b6f66001ec729c4e0',
];

export default function ReelScreen() {
  useFPSMonitor(true);

  return (
    <SafeAreaProvider>
      <MetricsProvider>
        <SeekProvider>
          <SafeAreaView edges={[]} style={styles.safeArea}>
            <View style={styles.container}>
              <VideoFeedList urls={CUSTOM_SOURCES} />
            </View>
          </SafeAreaView>
        </SeekProvider>
      </MetricsProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
