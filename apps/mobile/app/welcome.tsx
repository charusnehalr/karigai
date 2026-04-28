import { Link } from 'expo-router';
import { Text, View } from 'react-native';
import { KarigaiLogo, KSafetyBanner } from '@karigai/ui';

export default function WelcomeScreen() {
  return (
    <View style={{ flex: 1, padding: 20, justifyContent: 'center', gap: 16 }}>
      <KarigaiLogo />
      <Text style={{ color: 'white', fontSize: 16 }}>Privacy-first health and cycle wellness companion.</Text>
      <KSafetyBanner text="Karigai supports wellness planning and is not a diagnostic medical device." />
      <Link href="/auth/sign-up" style={{ color: '#c4b5fd' }}>Sign up</Link>
      <Link href="/auth/sign-in" style={{ color: '#c4b5fd' }}>Sign in</Link>
      <Link href="/onboarding" style={{ color: '#c4b5fd' }}>Continue onboarding</Link>
      <Link href="/(tabs)/today" style={{ color: '#c4b5fd' }}>Open app tabs</Link>
      <Link href="/design-system" style={{ color: '#c4b5fd' }}>Design system preview</Link>
    </View>
  );
}
