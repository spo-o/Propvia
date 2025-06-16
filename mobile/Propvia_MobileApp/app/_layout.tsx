{/* 
  This file is used to define the root layout of the application.
  If you want to change the layout of the application, you should do so here.
  THIS LAYOUT FILE SHOULD BE USED FOR GLOBAL CHANGES ONLY.
*/}
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0B4740',
        },
        headerShadowVisible: false,
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen 
        name="about"
        options={{ title: 'About', headerShown: true }} />
      <Stack.Screen 
        name="index"
        options={{ title: 'Propvia', headerShown: true }} />
        <Stack.Screen 
        name="property-explorer"
        options={{ title: 'Property Explorer', headerShown: true }} />
    </Stack>
  );
}
