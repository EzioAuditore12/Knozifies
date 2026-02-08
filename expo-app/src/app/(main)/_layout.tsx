import { Stack } from 'expo-router';

export default function MainScreensLayout() {
  return (
    <Stack initialRouteName="(tabs)">
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="user/[id]" />
    </Stack>
  );
}
