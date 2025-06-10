{/* 
  This file is used to define the root layout of the application.
  If you want to change the layout of the application, you should do so here.
  THIS LAYOUT FILE SHOULD BE USED FOR GLOBAL CHANGES ONLY.
*/}
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(pages)" options={{ title: "Propvia", headerShown: true }} />
    </Stack>
  );
}
