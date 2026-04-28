import { StyleSheet, View } from 'react-native';
import { VideoFeedList, PerformanceMonitor } from '@/features/reels/components';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { MetricsProvider } from '@/features/reels/contexts/metrics.context';
import { SeekProvider } from '@/features/reels/contexts/seek.context';
import { useFPSMonitor } from '@/features/reels/hooks/use-fps-monitor';

export default function ReelScreen() {
  useFPSMonitor(true);

  return (
    <SafeAreaProvider>
      <MetricsProvider>
        <SeekProvider>
          <SafeAreaView edges={[]} style={styles.safeArea}>
            <View style={styles.container}>
              <VideoFeedList />
              <PerformanceMonitor />
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
