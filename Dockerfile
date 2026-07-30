# =============================================================================
# Stage 1 — Dependencies
#   Install ALL dependencies (dev + prod) so the next stage can build.
#   Manifest files are copied first to maximise Docker layer caching.
# =============================================================================
FROM node:20-alpine AS deps

# libc6-compat improves compatibility for native modules (sharp, etc.) on musl
RUN apk add --no-cache libc6-compat

# Activate pnpm via corepack (version is also pinned in package.json)
RUN corepack enable && corepack prepare pnpm@11.13.1 --activate

WORKDIR /app

# Copy only dependency manifests → cache hits when source code changes
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./

# Install exactly per the lockfile (reproducible, no lockfile drift)
RUN pnpm install --frozen-lockfile

# =============================================================================
# Stage 2 — Build
#   Compile the Next.js standalone production bundle.
# =============================================================================
FROM node:20-alpine AS builder

RUN corepack enable && corepack prepare pnpm@11.13.1 --activate

WORKDIR /app

# Reuse the full node_modules tree from the deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy application source
COPY . .

# Build-time environment
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Produce a standalone server under .next/standalone
RUN pnpm build

# =============================================================================
# Stage 3 — Runner
#   Minimal production image that runs only the traced standalone server.
# =============================================================================
FROM node:20-alpine AS runner

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

WORKDIR /app

# Run as a non-root user for security
RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nextjs

# .next/standalone contains server.js + a traced, minimal node_modules
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# Static chunks are NOT embedded in standalone — copy separately
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# Public assets (favicon, images, etc.)
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs

EXPOSE 3000

# Verify the server is actually responding, not just running.
# Uses node (guaranteed present) instead of wget/curl to avoid extra packages.
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "fetch('http://localhost:3000/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server.js"]