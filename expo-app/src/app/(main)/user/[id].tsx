import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';
import { Description } from 'heroui-native/description';

export default function UserScreen() {
  const { id } = useLocalSearchParams() as unknown as { id: string };
  return (
    <View className="flex-1 justify-center items-center">
      <Description>{id}</Description>
    </View>
  );
}
