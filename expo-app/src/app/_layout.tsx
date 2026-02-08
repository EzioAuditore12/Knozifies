import '../../global.css';

import { Stack } from 'expo-router';

import { HeroUIThemeProvider } from '@/lib/theme';

export default function RootLayout() {
  return (
    <HeroUIThemeProvider>
      <Stack initialRouteName="(main)">
        <Stack.Screen name="(main)" options={{ headerShown: false }} />
      </Stack>
    </HeroUIThemeProvider>
  );
}
