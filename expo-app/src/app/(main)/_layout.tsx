import { Redirect, Stack } from 'expo-router';

import { useAuthStore } from '@/store/auth';

export default function MainScreensLayout() {
  const { user } = useAuthStore((state) => state);

  if (!user) return <Redirect href="/(auth)/login" />;

  return (
    <Stack initialRouteName="(tabs)">
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="user/[id]" options={{ headerShown: false }} />
    </Stack>
  );
}
