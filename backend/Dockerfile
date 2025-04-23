# ---------- Stage 1: Build ----------
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Generate Prisma client
COPY ./prisma ./prisma
RUN npx prisma generate

# Copy app source code
COPY . .

# Compile NestJS to dist/
RUN yarn build


# ---------- Stage 2: Production ----------
FROM node:18-alpine AS production

WORKDIR /app

# Copy only required files
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production

# Copy built output and Prisma client from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma

# Optional: copy other needed files (e.g., migrations or assets)
# COPY --from=builder /app/uploads ./uploads

EXPOSE 6001

CMD ["node", "dist/main.js"]
