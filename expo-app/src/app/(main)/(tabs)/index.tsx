import { View } from 'react-native';
import { Stack } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HomeHeader } from '@/features/home/components/header';
import { PostList } from '@/features/home/components/post-list';
import { useGetPosts } from '@/features/post/hooks/use-get-posts';
import { useRefreshOnFocus } from '@/hooks/use-refresh-on-focus';

export default function HomeScreen() {
  const safeAreaInsets = useSafeAreaInsets();

  const { data, refetch, fetchNextPage } = useGetPosts();

  const flattenedData = data?.pages.flat() ?? [];

  useRefreshOnFocus(refetch);
  return (
    <>
      <Stack.Screen
        options={{
          header: () => (
            <HomeHeader style={{ paddingTop: safeAreaInsets.top }} />
          ),
        }}
      />
      <View className="flex-1">
        <PostList data={flattenedData} onEndReached={fetchNextPage} />
      </View>
    </>
  );
}
