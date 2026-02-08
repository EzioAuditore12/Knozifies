import { Stack } from 'expo-router';

export default function MessagingScreensLayout() {
  return (
    <Stack initialRouteName="index">
      <Stack.Screen name="index" options={{ headerTitle: 'Message' }} />
    </Stack>
  );
}
