# Use the official Node.js 20 image as a parent image
FROM node:20-alpine AS base

ENV COREPACK_DEFAULT_TO_LATEST=0

ENV TZ=Asia/Ho_Chi_Minh

RUN apk add --no-cache tzdata && \
    cp /usr/share/zoneinfo/Asia/Ho_Chi_Minh /etc/localtime && \
    echo "Asia/Ho_Chi_Minh" > /etc/timezone

# Set the working directory
WORKDIR /app

# Install pnpm
RUN corepack enable

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install all dependencies (including dev dependencies)
RUN pnpm install --frozen-lockfile

# Copy the application code
COPY . .

# Build the application
RUN pnpm build

# Create the production image
FROM node:20-alpine AS release

ENV COREPACK_DEFAULT_TO_LATEST=0

ENV TZ=Asia/Ho_Chi_Minh

RUN apk add --no-cache tzdata && \
    cp /usr/share/zoneinfo/Asia/Ho_Chi_Minh /etc/localtime && \
    echo "Asia/Ho_Chi_Minh" > /etc/timezone

WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install only production dependencies
RUN corepack enable && pnpm install --prod --frozen-lockfile

# Copy the built application from the base stage
COPY --from=base /app/dist ./dist

# Expose the port and run the app
EXPOSE 8000
CMD ["node", "dist/server.js"]
