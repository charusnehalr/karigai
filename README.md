# karigai monorepo

Initial incremental scaffold for the karigai wellness platform.

## Included in this increment

- Monorepo workspace layout for mobile, admin, and api apps.
- Core shared packages: design tokens, UI stubs, shared types, health engine, rule engine, ai engine.
- Unit tests for baseline health calculations, safety rules, and AI schema validation.
- Product guardrails in `AGENTS.md`.

## Note on design prototype

The expected design prototype files were not present at implementation time and have been created as placeholders under `docs/design-prototype/` so the structure is in place for the next increment.

## Commands

```bash
pnpm install
pnpm lint
pnpm typecheck
pnpm test
```
