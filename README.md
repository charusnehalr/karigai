# Karigai Monorepo

Production-oriented starter monorepo for Karigai using **pnpm + Turborepo + TypeScript**.

## Apps

- `apps/mobile` — Expo React Native app (Expo Router route skeleton + design system preview)
- `apps/admin` — Next.js admin placeholder
- `apps/api` — NestJS API placeholder with Prisma schema and seed script

## Packages

- `packages/types`
- `packages/design-tokens`
- `packages/ui`
- `packages/health-engine`
- `packages/rule-engine`
- `packages/ai-engine`

## Quick start

```bash
pnpm install
pnpm dev
```

### Run one app

```bash
pnpm --filter @karigai/mobile dev
pnpm --filter @karigai/admin dev
pnpm --filter @karigai/api dev
```

### Quality commands

```bash
pnpm lint
pnpm typecheck
pnpm test
```

## Mobile routes scaffolded

- `/welcome`
- `/auth/sign-in`
- `/auth/sign-up`
- `/onboarding`
- `/analysis`
- `/(tabs)/today`
- `/(tabs)/cycle`
- `/(tabs)/meals`
- `/(tabs)/move`
- `/(tabs)/me`
- `/chat`
- `/privacy`
- `/consent`
- `/design-system`

## Prisma

Schema and seed file live in `apps/api/prisma`.
Set `DATABASE_URL` for PostgreSQL before running migrations.

```bash
pnpm --filter @karigai/api prisma:generate
pnpm --filter @karigai/api prisma:migrate
pnpm --filter @karigai/api prisma:seed
```

## Notes

- This repo intentionally includes no full product features yet.
- Onboarding/auth/consent are scaffold foundations with placeholder endpoints and screens.
