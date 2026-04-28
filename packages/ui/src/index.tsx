import React from 'react';
import { Text, View, ViewStyle } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { kgColors, kgSpacing, kgTypography } from '@karigai/design-tokens';

export const KarigaiMark = ({ size = 32 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="11" stroke={kgColors.primary} strokeWidth="2" />
    <Path d="M7 13C9 10 10 8 12 6C14 8 15 10 17 13" stroke={kgColors.primarySoft} strokeWidth="2" />
  </Svg>
);

export const KarigaiLogo = ({ text = 'karigai' }: { text?: string }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
    <KarigaiMark size={28} />
    <Text style={{ color: kgColors.textPrimary, fontSize: 22, fontWeight: '700' }}>{text}</Text>
  </View>
);

export const KCard = ({ children, style }: { children: React.ReactNode; style?: ViewStyle }) => (
  <View style={[{ backgroundColor: kgColors.surface, padding: kgSpacing.lg, borderRadius: 18 }, style]}>{children}</View>
);

export const KChip = ({ label }: { label: string }) => (
  <View style={{ backgroundColor: kgColors.chip, borderRadius: 999, paddingHorizontal: 12, paddingVertical: 6 }}>
    <Text style={{ color: kgColors.textPrimary }}>{label}</Text>
  </View>
);

export const KRing = ({ progress }: { progress: number }) => (
  <View style={{ width: 72, height: 72, borderRadius: 36, borderWidth: 8, borderColor: kgColors.primary }}>
    <Text style={{ color: kgColors.textPrimary, textAlign: 'center', marginTop: 20 }}>{Math.round(progress * 100)}%</Text>
  </View>
);

export const KPlaceholder = ({ label }: { label: string }) => (
  <View style={{ padding: 20, borderRadius: 12, borderStyle: 'dashed', borderWidth: 1, borderColor: kgColors.textSecondary }}>
    <Text style={{ color: kgColors.textSecondary }}>{label}</Text>
  </View>
);

export const KEyebrow = ({ children }: { children: React.ReactNode }) => (
  <Text style={{ ...kgTypography.eyebrow, color: kgColors.primarySoft }}>{children}</Text>
);

export const KStat = ({ label, value }: { label: string; value: string }) => (
  <View>
    <KEyebrow>{label}</KEyebrow>
    <Text style={{ color: kgColors.textPrimary, fontSize: 28, fontWeight: '700' }}>{value}</Text>
  </View>
);

export const KSafetyBanner = ({ text }: { text: string }) => (
  <View style={{ backgroundColor: '#3F1D1D', borderRadius: 12, padding: 12 }}>
    <Text style={{ color: '#FECACA' }}>{text}</Text>
  </View>
);

export const KIcon = ({ children }: { children: React.ReactNode }) => (
  <View style={{ width: 24, height: 24, alignItems: 'center', justifyContent: 'center' }}>{children}</View>
);
