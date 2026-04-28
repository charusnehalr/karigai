import React, { useMemo } from 'react';
import { Text, View, ActivityIndicator, ScrollView } from 'react-native';
import { analysisFromOnboarding } from '../../../../packages/health-engine/src/index.js';

export function StartingAnalysisScreen({ onboardingData, loading, error, useDemoData = false, demoData }) {
  const input = useDemoData ? demoData : onboardingData;
  const analysis = useMemo(() => (input ? analysisFromOnboarding(input) : null), [input]);

  if (loading) return <ActivityIndicator accessibilityLabel="analysis-loading" />;
  if (error) return <Text accessibilityLabel="analysis-error">Could not load analysis.</Text>;
  if (!analysis) return <Text>No onboarding data yet.</Text>;

  const safetyNotes = [
    'For wellness planning only. Not for diagnosis.',
    'Seek urgent care for severe symptoms or chest pain.',
  ];

  return (
    <ScrollView style={{ padding: 16, backgroundColor: '#0e1a22' }}>
      <Text style={{ color: '#fff', fontSize: 24, fontWeight: '700' }}>Starting Analysis</Text>
      <Card label="BMI" value={analysis.bmi.toFixed(1)} />
      <Card label="BMI category" value={analysis.bmiCategory} />
      <Card label="WHR" value={analysis.whr.toFixed(2)} />
      <Card label="Waist-to-height ratio" value={analysis.waistToHeightRatio.toFixed(2)} />
      <Card label="BRI" value={analysis.bri.toFixed(1)} />
      <Card label="BMR" value={`${Math.round(analysis.bmr)} kcal`} />
      <Card label="TDEE" value={`${Math.round(analysis.tdee)} kcal`} />
      <Card label="Current goal" value={analysis.goal} />
      <Card label="Target weight" value={`${analysis.targetWeightKg} kg`} />
      <Card label="Recommended weekly pace" value={analysis.recommendedWeeklyPace} />
      <Card label="Estimated cycle phase" value={analysis.estimatedCyclePhase} />
      <Card label="Safety notes" value={safetyNotes.join(' • ')} />
      <Text style={{ color: '#9ec1d4', marginTop: 8 }}>This app provides wellness support and is not a diagnosis or treatment service.</Text>
    </ScrollView>
  );
}

function Card({ label, value }) {
  return (
    <View style={{ backgroundColor: '#162734', borderRadius: 12, padding: 12, marginTop: 10 }}>
      <Text style={{ color: '#83b3cb', fontSize: 12 }}>{label}</Text>
      <Text style={{ color: '#fff', fontSize: 18, fontWeight: '600' }}>{value}</Text>
    </View>
  );
}
