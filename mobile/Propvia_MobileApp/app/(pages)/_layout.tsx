{/* 
  This file is used to define the page layout of the application.
  If you want to change the aspects of the pages, you should do so here.
  THIS LAYOUT FILE SHOULD BE USED FOR PAGE-LEVEL CHANGES ONLY.
*/}
import { Stack } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function PageLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#25292e',
        },
        headerShadowVisible: false,
        headerTintColor: '#fff',
      }}
    >
      {/*
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
              <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
            ),
          }}
        />
      */}
      <Stack.Screen
        name="about"
        options={{
          title: ''
        }}
      />
    </Stack>
  );
}

