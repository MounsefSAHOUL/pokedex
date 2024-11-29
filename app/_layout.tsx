import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../global.css';

import { Stack } from 'expo-router';

const queryClient = new QueryClient();

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
};

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        {/* <Stack.Screen name="modal" options={{ presentation: 'modal' }} /> */}
      </Stack>
    </QueryClientProvider>
  );
}
