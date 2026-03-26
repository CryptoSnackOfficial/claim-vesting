# ---- Build stage ----
FROM node:20-alpine AS builder

ARG NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID
ARG NEXT_PUBLIC_APP_URL
ARG NEXT_PUBLIC_VESTING_CONTRACT_ADDRESS
ARG NEXT_PUBLIC_SNACK_TOKEN_ADDRESS
ARG NEXT_PUBLIC_BSC_RPC_URL

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile

COPY . .

RUN echo "NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=${NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID}" >> .env
RUN echo "NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL}" >> .env
RUN echo "NEXT_PUBLIC_VESTING_CONTRACT_ADDRESS=${NEXT_PUBLIC_VESTING_CONTRACT_ADDRESS}" >> .env
RUN echo "NEXT_PUBLIC_SNACK_TOKEN_ADDRESS=${NEXT_PUBLIC_SNACK_TOKEN_ADDRESS}" >> .env
RUN echo "NEXT_PUBLIC_BSC_RPC_URL=${NEXT_PUBLIC_BSC_RPC_URL}" >> .env

RUN pnpm build

# ---- Runtime stage ----
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 8080

ENV PORT=8080
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
