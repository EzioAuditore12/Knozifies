import { View } from 'react-native';
import { Stack } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HomeHeader } from '@/features/home/components/header';
import { PostList } from '@/features/home/components/post-list';
import type { Post } from '@/features/home/components/post-card';

const DUMMY_POSTS: Post[] = [
  {
    id: '1',
    user: {
      name: 'alice',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    caption: 'Enjoying the sunshine! ☀️',
    likes: 120,
    comments: 14,
  },
  {
    id: '2',
    user: {
      name: 'bob',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca',
    caption: 'Hiking adventures in the mountains.',
    likes: 98,
    comments: 8,
  },
  {
    id: '3',
    user: {
      name: 'carol',
      avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308',
    caption: 'Best coffee in town! ☕️',
    likes: 76,
    comments: 5,
  },
];

export default function HomeScreen() {
  const safeAreaInsets = useSafeAreaInsets();
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
        <PostList data={DUMMY_POSTS} />
      </View>
    </>
  );
}
