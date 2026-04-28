import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { kgColors } from '@karigai/design-tokens';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: kgColors.bg },
          headerTintColor: kgColors.textPrimary,
          contentStyle: { backgroundColor: kgColors.bg }
        }}
      >
        <Stack.Screen name="welcome" options={{ title: 'Welcome' }} />
      </Stack>
    </SafeAreaProvider>
  );
}
