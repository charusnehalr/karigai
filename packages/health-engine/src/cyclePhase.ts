export type CyclePhase = 'menstrual' | 'follicular' | 'ovulatory' | 'luteal';

export const estimateCyclePhase = (dayOfCycle: number, cycleLength = 28): CyclePhase => {
  if (dayOfCycle <= 5) return 'menstrual';
  if (dayOfCycle < cycleLength / 2 - 2) return 'follicular';
  if (dayOfCycle <= cycleLength / 2 + 1) return 'ovulatory';
  return 'luteal';
};
