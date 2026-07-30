FROM node:20-alpine AS deps

# Install dependencies required for native modules
RUN apk add --no-cache libc6-compat

# Enable corepack to use pnpm, which is the modern way
RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

# Use --frozen-lockfile for reproducible installs
RUN pnpm install --frozen-lockfile


FROM node:20-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

ENV NODE_ENV=production

# Enable corepack to use pnpm (version picked from package.json)
RUN corepack enable

RUN pnpm run build


FROM node:20-alpine AS runner

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

WORKDIR /app

# Install libc6-compat for compatibility and create a non-root user for security
RUN apk add --no-cache libc6-compat \
 && addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nextjs

# .next/standalone contains server.js + a traced, minimal node_modules
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# Static chunks are NOT embedded in standalone — copy separately
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# Public assets (favicon, images, etc.)
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]