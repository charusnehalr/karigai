export type OnboardingForm = {
  age: number;
  heightCm: number;
  weightKg: number;
  consentGiven: boolean;
};

export const validateOnboardingForm = (form: OnboardingForm): string[] => {
  const errors: string[] = [];

  if (form.age < 13 || form.age > 99) errors.push('Age must be between 13 and 99.');
  if (form.heightCm < 120 || form.heightCm > 230) errors.push('Height out of supported range.');
  if (form.weightKg < 30 || form.weightKg > 250) errors.push('Weight out of supported range.');
  if (!form.consentGiven) errors.push('Consent is required to continue.');

  return errors;
};
