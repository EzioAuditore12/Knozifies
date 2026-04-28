import { router, Stack } from 'expo-router';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ConversationList } from '@/features/chat/components/home/conversation-list';
import { Header } from '@/features/chat/components/home/header';

import { useLiveConversationDetails } from '@/features/chat/hooks/database/use-live-conversation-details';
import { Button } from 'heroui-native/button';
import { Ionicons } from '@/components/icon';

export default function MessageScreen() {
  const safeAreaInsets = useSafeAreaInsets();

  const { data, isFetching, isLoading, fetchNextPage } =
    useLiveConversationDetails();

  return (
    <>
      <Stack.Screen
        options={{
          header: () => <Header style={{ paddingTop: safeAreaInsets.top }} />,
        }}
      />
      <View
        className="relative flex-1 gap-y-2 p-1"
        style={{ paddingBottom: safeAreaInsets.bottom }}
      >
        <ConversationList
          data={data}
          onEndReached={fetchNextPage}
          isLoading={isLoading}
          isFetchingNextPage={isFetching}
        />

        <Button
          className="absolute right-5 bottom-5"
          accessibilityHint={'Ai'}
          style={{
            backgroundColor: '#8b5cf6', // modern purple for AI
            borderRadius: 32,
            padding: 16,
            elevation: 6, // Android shadow
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
          }}
          onPress={() => router.push('/(main)/chat/ai')}
        >
          <Ionicons name="chatbubble-ellipses" color="#fff" size={28} />
        </Button>
      </View>
    </>
  );
}
