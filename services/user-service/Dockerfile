# Build stage
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY prisma ./prisma
COPY prisma/schema.prisma ./prisma/schema.prisma
RUN npx prisma generate

COPY . .

RUN npm run build

# Final stage
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/prisma ./prisma

ENV NODE_ENV=production
CMD npx prisma migrate deploy && node dist/index.js
