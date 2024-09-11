# Use the official Node.js 20 image as a parent image
FROM node:20-alpine AS base

# Set the working directory
WORKDIR /app

# Install pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the application code
COPY . .

# Build the application
RUN pnpm build

# Create the production image
FROM node:20-alpine AS release
WORKDIR /app

# Copy the necessary files
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/dist ./dist
COPY --from=base /app/package.json ./

# Expose the port and run the app
EXPOSE 8000
CMD ["node", "dist/server.js"]
