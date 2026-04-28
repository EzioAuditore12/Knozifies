import { View, type ViewProps } from 'react-native';
import { Button } from 'heroui-native/button';
import { router } from 'expo-router';
import { cn } from 'tailwind-variants';

import { syncDatabase } from '@/db/sync';
import { Description } from 'heroui-native/description';

export function Header({ className, ...props }: ViewProps) {
  return (
    <View className={cn('flex-row items-center p-2', className)} {...props}>
      <Description className="text-xl font-bold ">Messages</Description>

      <Button className="ml-2" onPress={() => syncDatabase.pullChanges()}>
        Sync
      </Button>

      <Button
        className="ml-auto"
        onPress={() => router.push('/(main)/chat/new-group')}
      >
        Create Group
      </Button>
    </View>
  );
}
