import { Tabs } from 'expo-router';
import { Avatar } from 'heroui-native/avatar';

import { useAuthStore } from '@/store/auth';

import { Ionicons } from '@/components/icon';

export default function TabsLayout() {
  const { user } = useAuthStore((state) => state);

  return (
    <Tabs initialRouteName="index" screenOptions={{ tabBarShowLabel: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Ionicons size={32} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="reels"
        options={{
          title: 'Reels',
          tabBarIcon: ({ color }) => (
            <Ionicons size={32} name="videocam" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="message"
        options={{
          title: 'Message',
          tabBarIcon: ({ color }) => (
            <Ionicons size={32} name="chatbox" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => (
            <Ionicons size={32} name="search" color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Avatar className="size-8" alt={user?.firstName ?? ''}>
              <Avatar.Image src={user?.avatar ?? ''} />
              <Avatar.Fallback>{user?.firstName[0]}</Avatar.Fallback>
            </Avatar>
          ),
        }}
      />
    </Tabs>
  );
}
