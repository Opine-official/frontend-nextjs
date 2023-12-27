FROM node:18-alpine AS base

RUN npm install pnpm -g

FROM base AS deps

RUN apk add --no-cache libc6-compat


WORKDIR /usr/src/app

COPY package*.json ./

RUN pnpm install

FROM base AS builder

WORKDIR /usr/src/app

COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .

RUN pnpm build

FROM base AS runner

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/.next/standalone ./
COPY --from=builder /usr/src/app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]