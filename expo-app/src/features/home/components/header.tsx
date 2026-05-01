import { Ionicons } from '@/components/icon';
import { ThrottledTouchable } from '@/components/throttled-touchable';
import { router } from 'expo-router';
import { Description } from 'heroui-native/description';
import { View, type ViewProps } from 'react-native';
import { cn } from 'tailwind-variants';

export function HomeHeader({ className, ...props }: ViewProps) {
  return (
    <View
      className={cn('p-2 flex-row justify-between gap-x-2', className)}
      {...props}
    >
      <ThrottledTouchable onPress={() => router.push('/(main)/upload')}>
        <Ionicons name="add" className="text-4xl" />
      </ThrottledTouchable>
      <Description className="text-2xl font-bold">Knozifies</Description>
      <Ionicons name="heart" className="text-4xl" />
    </View>
  );
}
