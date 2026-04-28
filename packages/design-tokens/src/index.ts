export const kgColors = {
  bg: '#0B1020',
  surface: '#151D33',
  textPrimary: '#F8FAFC',
  textSecondary: '#A5B4FC',
  primary: '#7C3AED',
  primarySoft: '#C4B5FD',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  chip: '#1E293B'
} as const;

export const kgTypography = {
  familySans: 'System',
  familySerif: 'Georgia',
  eyebrow: { fontSize: 12, letterSpacing: 1.2, fontWeight: '600' },
  body: { fontSize: 16, lineHeight: 24, fontWeight: '400' },
  title: { fontSize: 24, lineHeight: 32, fontWeight: '700' }
} as const;

export const kgSpacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32
} as const;
