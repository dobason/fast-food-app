# Development Dockerfile for Next.js
FROM node:20-alpine

WORKDIR /app

# Install dependencies for better compatibility
RUN apk add --no-cache libc6-compat

# Copy package files first
COPY package.json package-lock.json ./

# Clean install dependencies (node_modules is excluded by .dockerignore)
RUN npm ci || npm install

# Copy application files (node_modules excluded by .dockerignore)
COPY . .

# Set development environment
ENV NODE_ENV=development
ENV PORT=3001

# Expose the port
EXPOSE 3001

# Start Next.js in development mode
CMD ["npm", "run", "dev"]
