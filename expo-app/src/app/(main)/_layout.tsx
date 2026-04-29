import { Redirect, Stack } from 'expo-router';

import { useAuthStore } from '@/store/auth';
import { useSyncEngine } from '@/db/sync/hook';
import { useSocketState } from '@/store/socket';
import { useEffect } from 'react';
import { useReceiveMessageEvent } from '@/features/chat/events/receive-message.event';
import { useReceiveGroupMessageEvent } from '@/features/chat/events/receive-group-message.event';

export default function MainScreensLayout() {
  const { user } = useAuthStore((state) => state);

  useSyncEngine();

  const { socket, connectSocket, disconnectSocket } = useSocketState();

  useEffect(() => {
    if (user) connectSocket();

    return () => disconnectSocket();
  }, [user, connectSocket, disconnectSocket]);

  useReceiveMessageEvent(socket);
  useReceiveGroupMessageEvent(socket);

  if (!user) return <Redirect href="/(auth)/login" />;

  return (
    <Stack initialRouteName="(tabs)">
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="user/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="chat/ai/index" />
      <Stack.Screen name="chat/group/[id]" />
      <Stack.Screen name="chat/new-group/index" />
      <Stack.Screen name="chat/one-to-one/[id]" />
      <Stack.Screen name="chat/new-one-to-one/[id]" />
      <Stack.Screen
        name="upload/index"
        options={{
          headerShown: false,
          animationMatchesGesture: true,
          animation: 'slide_from_left',
        }}
      />
    </Stack>
  );
}
