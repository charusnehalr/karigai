# Karigai engineering instructions

Karigai is a women-focused wellness intelligence app.

## Product rules

This app provides wellness, fitness, nutrition, cycle, and lifestyle support.
It is not a medical device and must not diagnose, treat, cure, or prevent disease.

The app must not:
- Diagnose PCOS, PCOD, diabetes, thyroid disease, anemia, infertility, pregnancy, eating disorders, or menstrual disorders.
- Prescribe medication.
- Prescribe supplement dosages.
- Recommend extreme calorie restriction.
- Recommend unsafe fasting.
- Claim to treat PCOS, prediabetes, obesity, insulin resistance, or menstrual disorders.
- Replace clinician advice.

The app may:
- Track self-reported conditions.
- Provide general wellness plans.
- Adjust workouts and meals based on user preferences, symptoms, and self-reported context.
- Recommend clinician follow-up for red-flag symptoms.
- Provide rule-checked AI explanations.

## Technical rules

Use TypeScript everywhere unless explicitly working inside a Python service.
Use shared types from packages/types.
Use shared calculation functions from packages/health-engine.
Use shared safety rules from packages/rule-engine.
Do not duplicate business logic in mobile screens.

The LLM must never directly write to the database.
The LLM may only propose changes.
Plan changes must pass rule validation and require user approval.

## Design rules

Use /docs/design-prototype as visual reference.
Do not import prototype JSX directly into React Native.
Port the design into native components.

Brand name: karigai
Brand style: clinical-soft, warm, premium, privacy-first.
Primary palette comes from brand.jsx.
Typography comes from brand.jsx.
Use calm UI, small safety notes, and structured cards.

## Testing

Add unit tests for:
- BMI
- WHR
- BRI
- BMR
- TDEE
- Cycle phase estimation
- Goal planner
- Safety rules
- AI output schema validation

Run:
- pnpm lint
- pnpm typecheck
- pnpm test

before completing a task.
