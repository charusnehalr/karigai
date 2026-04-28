FROM node:22-alpine AS base
WORKDIR /app
RUN corepack enable

COPY package.json pnpm-workspace.yaml tsconfig.base.json ./
COPY apps/api/package.json ./apps/api/package.json
COPY packages ./packages
RUN pnpm install --frozen-lockfile=false

COPY apps/api ./apps/api
WORKDIR /app/apps/api
RUN pnpm typecheck && pnpm test

EXPOSE 3000
CMD ["node", "-e", "console.log('karigai api container ready')"]
