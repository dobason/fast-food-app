# Development Dockerfile for Next.js
FROM node:20-alpine

WORKDIR /app

# Install dependencies for better compatibility
RUN apk add --no-cache libc6-compat

# Copy package files
COPY package.json package-lock.json ./

# Install all dependencies (including devDependencies for development)
RUN npm install

# Copy application files
COPY . .

# Set development environment
ENV NODE_ENV=development
ENV PORT=3000

# Expose the port
EXPOSE 3000

# Start Next.js in development mode
CMD ["npm", "run", "dev"]
