import '../../global.css';

import { Stack } from 'expo-router';
import { KeyboardProvider } from 'react-native-keyboard-controller';

import { HeroUIThemeProvider } from '@/lib/theme';

import { PowerSyncDatabaseProvider } from '@/db';
import { TanstackReactQueryClientProvider } from '@/lib/tanstack/query';

export default function RootLayout() {
  return (
    <HeroUIThemeProvider>
      <KeyboardProvider>
        <PowerSyncDatabaseProvider>
          <TanstackReactQueryClientProvider>
            <Stack
              initialRouteName="(main)"
              screenOptions={{ headerShown: false }}
            />
          </TanstackReactQueryClientProvider>
        </PowerSyncDatabaseProvider>
      </KeyboardProvider>
    </HeroUIThemeProvider>
  );
}
