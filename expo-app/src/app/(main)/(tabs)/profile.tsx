import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from 'heroui-native/button';
import { Description } from 'heroui-native/description';

import { UserProfile } from '@/features/common/components/user-profile';
import { useGetProfile } from '@/features/settings/hooks/queries/use-get-profile';

import { useAuthStore } from '@/store/auth';
import { useRefreshOnFocus } from '@/hooks/use-refresh-on-focus';
import { UserProfileLoading } from '@/features/common/components/user-profile-loading';
import { useGetUserPosts } from '@/features/post/hooks/use-get-user-posts';
import { PostList } from '@/features/home/components/post-list';

export default function UserProfileScreen() {
  const safeAreaInsets = useSafeAreaInsets();

  const { logout } = useAuthStore((state) => state);

  const { data, refetch, isLoading } = useGetProfile();

  const { data: posts, fetchNextPage } = useGetUserPosts();

  const flattenedPosts = posts?.pages.flat() ?? [];
  const hasPosts = flattenedPosts.length > 0;

  useRefreshOnFocus(refetch);

  if (isLoading)
    return (
      <View
        style={{ marginTop: safeAreaInsets.top }}
        className="flex-1 items-center justify-center gap-y-2 p-2"
      >
        <UserProfileLoading
          className="w-full max-w-4xl"
          variant="pulse"
          isLoading={isLoading}
        />

        <Button variant="danger" onPress={logout}>
          Logout
        </Button>
      </View>
    );

  return (
    <PostList
      data={flattenedPosts}
      onEndReached={() => fetchNextPage()}
      style={{ flex: 1, marginTop: safeAreaInsets.top }}
      contentContainerStyle={{ paddingBottom: 24 }}
      ListEmptyComponent={
        <View className="items-center px-4 pb-8 pt-2">
          <Description className="text-base text-center text-gray-500">
            No posts yet.
          </Description>
        </View>
      }
      ListHeaderComponent={
        <View className="gap-4 px-4 pt-4">
          <View className="rounded-3xl border border-white/10 bg-white/5 p-4">
            <UserProfile className="w-full" data={data} />

            <View className="mt-4 flex-row items-center justify-between gap-3">
              <Description className="text-lg font-bold">Profile</Description>
              <Button variant="danger" onPress={logout}>
                Logout
              </Button>
            </View>
          </View>

          <View className="flex-row items-center justify-between px-1">
            <Description className="text-2xl font-bold">Posts</Description>
            <Description className="text-sm text-gray-500">
              {hasPosts ? `${flattenedPosts.length} total` : 'No posts yet'}
            </Description>
          </View>
        </View>
      }
    />
  );
}
