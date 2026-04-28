export const calculateBri = (waistCm: number, heightCm: number): number => {
  if (heightCm <= 0) throw new Error('height must be positive');
  const waistM = waistCm / 100;
  const heightM = heightCm / 100;
  const value = 364.2 - 365.5 * Math.sqrt(1 - (waistM / (2 * Math.PI)) ** 2 / (0.5 * heightM) ** 2);
  return Number(value.toFixed(2));
};
