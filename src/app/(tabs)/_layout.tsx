import { HapticTab } from '@/src/components/haptic-tab';
import { useThemeColor } from '@/src/hooks/use-theme-color';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  const backgroundColor = useThemeColor({}, 'background');
  const activeTintColor = useThemeColor({}, 'tabIconSelected');
  const inactiveTintColor = useThemeColor({}, 'tabIconDefault');
  const borderTopColor = `${useThemeColor({}, 'text')}33`;
  return (
    <Tabs
      screenOptions={{
      tabBarActiveTintColor: activeTintColor,
      tabBarInactiveTintColor: `${inactiveTintColor}90`,
      headerShown: false,
      tabBarButton: HapticTab,
      tabBarShowLabel: false,
      tabBarStyle: {
        borderTopColor,
        backgroundColor,
      },
      tabBarIconStyle: {
        marginTop: 8,
        marginBottom: 8,
      },
      }}>
      <Tabs.Screen
      name="assets"
      options={{
        title: 'Assets',
        tabBarIcon: ({ color }) => (
          <Entypo name="wallet" size={28} color={color} style={{ alignSelf: 'center' }} />
        ),
      }}
      />
      <Tabs.Screen
      name="profile"
      options={{
        title: 'Profile',
        tabBarIcon: ({ color }) => (
        <FontAwesome size={28} name="user" color={color} style={{ alignSelf: 'center' }} />
        ),
      }}
      />
    </Tabs>
  );
}