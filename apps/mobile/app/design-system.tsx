import { View } from 'react-native';
import { KCard, KChip, KEyebrow, KRing, KSafetyBanner, KStat, KarigaiLogo } from '@karigai/ui';

export default function DesignSystemScreen() {
  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <KarigaiLogo />
      <KCard>
        <KEyebrow>Buttons & Chips</KEyebrow>
        <KChip label="Hormone-safe" />
      </KCard>
      <KCard><KRing progress={0.68} /></KCard>
      <KCard><KStat label="Cycle day" value="14" /></KCard>
      <KSafetyBanner text="Wellness guidance only — not diagnosis." />
    </View>
  );
}
