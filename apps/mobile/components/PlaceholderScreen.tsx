import { KCard, KarigaiLogo, KPlaceholder } from '@karigai/ui';
import { Link } from 'expo-router';
import { Text, View } from 'react-native';

export function PlaceholderScreen({ title }: { title: string }) {
  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <KarigaiLogo />
      <KCard>
        <Text style={{ color: 'white', fontSize: 22, fontWeight: '700' }}>{title}</Text>
        <KPlaceholder label="Screen under construction" />
      </KCard>
      <Link href="/welcome" style={{ color: '#a5b4fc' }}>
        Back to welcome
      </Link>
    </View>
  );
}
