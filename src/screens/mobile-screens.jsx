import React, { useEffect, useMemo, useState } from 'react';
import { api } from '../api/client';
import { buildSafetyFlags, cycleConfidenceTag } from '../services/ruleEngine';
import { runChatPipeline } from '../services/chatOrchestrator';

export function CycleScreen() {
  const [summary, setSummary] = useState(null);
  const [predictions, setPredictions] = useState(null);
  const [eventForm, setEventForm] = useState({ type: 'period_start', date: new Date().toISOString().slice(0, 10), notes: '' });
  const [symptomForm, setSymptomForm] = useState({ date: new Date().toISOString().slice(0, 10), flow: 'light', painScore: 0, symptoms: [], spotting: false, dizziness: false, missedPeriod: false, notes: '' });

  useEffect(() => {
    Promise.all([api.cycle.getSummary(), api.cycle.getPredictions()]).then(([s, p]) => {
      setSummary(s);
      setPredictions(p);
    });
  }, []);

  const confidence = useMemo(() => cycleConfidenceTag(summary?.cycleVariabilityDays || 0), [summary]);
  const safety = buildSafetyFlags({ symptomLog: symptomForm, cycleEvent: eventForm });

  const savePeriodEvent = async () => {
    await api.cycle.postEvent(eventForm);
    setSummary(await api.cycle.getSummary());
  };

  const saveSymptoms = async () => {
    await api.cycle.postSymptoms(symptomForm);
  };

  return {
    screen: 'S_Cycle',
    calendar: summary?.calendar || [],
    currentCycleDay: summary?.currentCycleDay,
    estimatedPhase: summary?.phase,
    nextPeriodPredictionRange: predictions?.nextPeriodRange,
    predictionConfidence: confidence,
    flowLogging: symptomForm.flow,
    painScore: symptomForm.painScore,
    pmsSymptoms: symptomForm.symptoms,
    spotting: symptomForm.spotting,
    missedPeriod: symptomForm.missedPeriod,
    notes: symptomForm.notes,
    safetyBanner: safety.requiresBanner
      ? 'Severe pain, heavy bleeding, or dizziness detected. Consider urgent care if worsening.'
      : null,
    actions: { savePeriodEvent, saveSymptoms },
  };
}

export function MealsScreen() {
  const [targets, setTargets] = useState(null);
  const [summary, setSummary] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [foods, setFoods] = useState([]);
  const [filters, setFilters] = useState({ dietType: 'all', allergies: [] });

  useEffect(() => {
    Promise.all([api.nutrition.getTargets(), api.nutrition.getDailySummary(), api.nutrition.getMealTemplates()]).then(
      ([t, s, mt]) => {
        setTargets(t);
        setSummary(s);
        setTemplates(mt);
      }
    );
  }, []);

  const caloriesRemaining = (targets?.calories || 0) - (summary?.calories || 0);

  const searchFood = async (query) => {
    setFoods(await api.nutrition.searchFoods(query));
  };

  const addFood = async (food) => {
    await api.nutrition.postMealLog(food);
    setSummary(await api.nutrition.getDailySummary());
  };

  const addCustomFood = async (food) => {
    const created = await api.nutrition.createCustomFood(food);
    await addFood({ foodId: created.id, servings: 1 });
  };

  const filteredTemplates = templates.filter((template) => {
    if (filters.dietType !== 'all' && !template.dietTypes?.includes(filters.dietType)) return false;
    if (filters.allergies.some((a) => template.allergens?.includes(a))) return false;
    return true;
  });

  return {
    screen: 'S_Meals',
    calorieTarget: targets?.calories,
    caloriesRemaining,
    proteinProgress: summary?.macros?.protein,
    carbProgress: summary?.macros?.carbs,
    fatProgress: summary?.macros?.fat,
    fiberProgress: summary?.fiber,
    waterProgress: summary?.water,
    micronutrientPriorityTracking: summary?.micronutrients,
    mealList: summary?.meals || [],
    suggestedMealCards: filteredTemplates,
    deficiencyAwareSuggestions: summary?.deficiencyAwareSuggestions || [],
    pcosPrediabetesSupportiveNotes: 'Balanced carbs + protein/fiber can support stable energy. Not medical treatment.',
    actions: { searchFood, addFood, addCustomFood, setFilters },
  };
}

export function WorkoutScreen() {
  const [workout, setWorkout] = useState(null);
  const [feedback, setFeedback] = useState({ rpeActual: null, pain: 0, notes: '' });

  useEffect(() => {
    api.workouts.getToday().then(setWorkout);
  }, []);

  const startWorkout = async () => {
    await api.workouts.start({ workoutId: workout.id, startedAt: new Date().toISOString() });
  };

  const completeWorkout = async () => {
    await api.workouts.complete({ workoutId: workout.id, completedAt: new Date().toISOString(), feedback });
  };

  const skipWorkout = async (reason) => {
    await api.workouts.skip({ workoutId: workout.id, reason });
  };

  const swapExercise = async (fromExerciseId, toExerciseId) => {
    await api.workouts.swapExercise({ workoutId: workout.id, fromExerciseId, toExerciseId });
    setWorkout(await api.workouts.getToday());
  };

  return {
    screen: 'S_Workout',
    workoutTitle: workout?.title,
    cycleAwareIntensityNote: workout?.cycleAwareIntensityNote,
    duration: workout?.durationMinutes,
    exerciseCount: workout?.exercises?.length || 0,
    rpeTarget: workout?.rpeTarget,
    backupWorkout: workout?.backupWorkout,
    exerciseList: workout?.exercises || [],
    injuryRestrictions: workout?.injuryRestrictions || [],
    safetyBanner: workout?.safetyFlags?.length ? workout.safetyFlags.join(' • ') : null,
    workoutInputs: workout?.inputs,
    actions: { startWorkout, completeWorkout, skipWorkout, swapExercise, setFeedback },
  };
}

export function AIChatScreen() {
  const [messages, setMessages] = useState([]);

  const contextProvider = async () => {
    const [cycleSummary, nutritionSummary, workoutToday] = await Promise.all([
      api.cycle.getSummary(),
      api.nutrition.getDailySummary(),
      api.workouts.getToday(),
    ]);

    return { cycleSummary, nutritionSummary, workoutToday };
  };

  const send = async (text) => {
    const userMessage = { role: 'user', text, createdAt: new Date().toISOString() };
    setMessages((m) => [...m, userMessage]);

    const assistant = await runChatPipeline(text, contextProvider);
    setMessages((m) => [...m, { role: 'assistant', structured: assistant, createdAt: new Date().toISOString() }]);
  };

  return {
    screen: 'S_AIChat',
    messages,
    send,
    architecture: 'intent -> context -> rules -> ai structured output -> safety validation -> save/return',
  };
}

export function PrivacyDataScreen() {
  const [privacy, setPrivacy] = useState(null);
  const [consents, setConsents] = useState([]);

  useEffect(() => {
    Promise.all([api.privacy.get(), api.privacy.getConsents()]).then(([p, c]) => {
      setPrivacy(p);
      setConsents(c);
    });
  }, []);

  const updateConsent = async (changes) => {
    await api.privacy.updateConsents(changes);
    setConsents(await api.privacy.getConsents());
  };

  const exportData = async () => api.privacy.exportData();
  const deleteAccount = async () => api.privacy.deleteAccount();

  return {
    screen: 'S_Privacy',
    healthDataEncryptionStatus: privacy?.encryptionStatus,
    connectedHealthAppStatus: privacy?.connectedHealthApp,
    appleHealthKitStatus: privacy?.appleHealthKit,
    androidHealthConnectStatus: privacy?.androidHealthConnect,
    consentHistory: consents,
    aiPersonalizationToggle: privacy?.aiPersonalization,
    anonymousResearchToggle: privacy?.anonymousResearch,
    redFlagSafetyDetectionToggle: privacy?.redFlagSafetyDetection,
    appVersion: privacy?.appVersion,
    disclaimer: 'This app supports wellness and is not a medical device.',
    actions: { updateConsent, exportData, deleteAccount },
  };
}

export function getTodayDashboardCycleCard(summary) {
  return {
    cycleDay: summary.currentCycleDay,
    phase: summary.phase,
    predictionConfidence: cycleConfidenceTag(summary.cycleVariabilityDays),
  };
}

export function getWorkoutIntensityAdjustment({ phase, symptoms }) {
  const pain = symptoms?.painScore || 0;
  const fatigue = symptoms?.fatigueScore || 0;

  if (pain >= 7 || fatigue >= 8) return { adjustment: -2, note: 'Reduce intensity and consider backup workout.' };
  if (phase === 'luteal' && fatigue >= 6) return { adjustment: -1, note: 'Slight intensity reduction recommended.' };
  return { adjustment: 0, note: 'Standard intensity.' };
}
