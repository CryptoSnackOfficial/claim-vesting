# ---- Build stage ----
FROM node:20-alpine AS builder

ARG WALLETCONNECT_PROJECT_ID
ARG APP_URL
ARG VESTING_CONTRACT_ADDRESS
ARG SNACK_TOKEN_ADDRESS
ARG BSC_RPC_URL

ENV NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=${WALLETCONNECT_PROJECT_ID}
ENV NEXT_PUBLIC_APP_URL=${APP_URL}
ENV NEXT_PUBLIC_VESTING_CONTRACT_ADDRESS=${VESTING_CONTRACT_ADDRESS}
ENV NEXT_PUBLIC_SNACK_TOKEN_ADDRESS=${SNACK_TOKEN_ADDRESS}
ENV NEXT_PUBLIC_BSC_RPC_URL=${BSC_RPC_URL}

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile

COPY . .
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
