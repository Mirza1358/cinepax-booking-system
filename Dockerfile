# Multi-stage build for production deployment

# Stage 1: Build the client
FROM node:18-alpine AS client-build
WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci --only=production
COPY client/ ./
RUN npm run build

# Stage 2: Setup the server
FROM node:18-alpine AS server-setup
WORKDIR /app/server
COPY server/package*.json ./
RUN npm ci --only=production
COPY server/ ./

# Stage 3: Production image
FROM node:18-alpine AS production
WORKDIR /app

# Copy server files
COPY --from=server-setup /app/server ./server

# Copy built client files
COPY --from=client-build /app/client/dist ./server/public

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5050

# Expose port
EXPOSE 5050

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:5050/api/health || exit 1

# Start the server
CMD ["node", "./server/server.js"] 