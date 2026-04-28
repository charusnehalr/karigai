export const calculateBmi = (weightKg: number, heightCm: number): number => {
  const heightM = heightCm / 100;
  if (heightM <= 0) throw new Error('height must be positive');
  return Number((weightKg / (heightM * heightM)).toFixed(2));
};
