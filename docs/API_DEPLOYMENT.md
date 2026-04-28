# API deployment notes

## Environment validation
- Environment variables are parsed via `apps/api/src/config/env.ts` before boot.
- Required: `DATABASE_URL`.
- Optional observability: `SENTRY_DSN`, `OTEL_EXPORTER_OTLP_ENDPOINT`.

## Build and run
```bash
pnpm install
pnpm --filter @karigai/api typecheck
pnpm --filter @karigai/api test
```

## Container
```bash
docker build -f apps/api/Dockerfile .
```

## Security baseline
- Secure headers from `httpGuards.ts`.
- Request validation schemas in `requestValidation.ts`.
- Privacy-safe logger redacts sensitive fields.

## Admin deployment
The admin app is currently scaffold-only and can be deployed to Vercel once the UI implementation is added.
