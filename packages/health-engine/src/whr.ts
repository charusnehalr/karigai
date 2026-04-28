export const calculateWhr = (waistCm: number, hipCm: number): number => {
  if (hipCm <= 0) throw new Error('hip must be positive');
  return Number((waistCm / hipCm).toFixed(2));
};
