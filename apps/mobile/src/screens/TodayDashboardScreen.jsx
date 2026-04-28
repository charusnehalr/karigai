import React, { useState } from 'react';
import { Text, View, ScrollView, Pressable } from 'react-native';

export function TodayDashboardScreen({ dailyPlan, logs, onToggleChecklist }) {
  const [localChecklist, setLocalChecklist] = useState(dailyPlan?.dailyChecklist ?? []);

  if (!dailyPlan) return <Text>Welcome! Your plan will appear after onboarding.</Text>;

  const toggle = (item) => {
    const next = localChecklist.map((entry) => (entry.id === item.id ? { ...entry, done: !entry.done } : entry));
    setLocalChecklist(next);
    onToggleChecklist?.(item.id, !item.done);
  };

  return (
    <ScrollView style={{ padding: 16, backgroundColor: '#0e1a22' }}>
      <Text style={{ color: '#fff', fontSize: 24, fontWeight: '700' }}>{dailyPlan.greeting} • {dailyPlan.date}</Text>
      <Card title="Cycle phase">{dailyPlan.cyclePhase}</Card>
      <Card title="Energy check-in">{dailyPlan.energy}</Card>
      <Card title="Nutrition target rings">{Math.round((logs.nutritionProgress ?? 0) * 100)}%</Card>
      <Card title="Water progress">{Math.round((logs.waterProgress ?? 0) * 100)}%</Card>
      <Card title="Workout card">{dailyPlan.workout}</Card>
      <Card title="AI insight card">{dailyPlan.aiInsight}</Card>
      <View style={{ marginTop: 12 }}>
        <Text style={{ color: '#fff', fontWeight: '700', marginBottom: 8 }}>Daily checklist</Text>
        {localChecklist.map((item) => (
          <Pressable key={item.id} onPress={() => toggle(item)} style={{ backgroundColor: '#162734', padding: 10, borderRadius: 10, marginBottom: 8 }}>
            <Text style={{ color: item.done ? '#5fe08b' : '#fff' }}>{item.done ? '✓ ' : ''}{item.label}</Text>
          </Pressable>
        ))}
      </View>
      <Card title="Tab bar">Home • Plan • Log • Coach • Profile</Card>
    </ScrollView>
  );
}

function Card({ title, children }) {
  return (
    <View style={{ backgroundColor: '#162734', borderRadius: 12, padding: 12, marginTop: 10 }}>
      <Text style={{ color: '#83b3cb', fontSize: 12 }}>{title}</Text>
      <Text style={{ color: '#fff', fontSize: 18, fontWeight: '600' }}>{children}</Text>
    </View>
  );
}
