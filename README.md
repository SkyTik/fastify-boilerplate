# Fastify Boilerplate

A modern backend service built with Fastify, TypeScript, and MongoDB.

## Overview

This boilerplate provides a well-structured foundation for building scalable and maintainable Node.js applications using Fastify. It includes essential configurations, patterns, and tools to help you get started quickly with best practices in mind.

## Prerequisites

- **Node.js**: >= 20.0.0
- **pnpm**: 10.14.0 or later
- **MongoDB**: Running instance
- **Redis**: Running instance

## Features

- **Fastify Framework**: Fast and low overhead web framework for Node.js
- **TypeScript Support**: Type safety for better development experience
- **MongoDB Integration**: Database connectivity with MongoDB
- **Redis Support**: Caching and data storage with Redis
- **API Versioning**: Built-in versioning structure for your APIs
- **Security**: Helmet for security headers
- **CORS Support**: Cross-origin resource sharing with configurable origins
- **Health Checks**: `GET /health` endpoint for monitoring service health
- **Graceful Shutdown**: Proper handling of application shutdown
- **Docker Support**: Multi-stage build for optimized production images
- **Environment Configuration**: Schema-validated environment variables
- **Error Handling**: Centralized error handling
- **Request Logging**: Comprehensive request logging with Pino
- **Testing**: Jest with TypeScript support

## Project Structure

```text
.
├── src/                  # Source code
│   ├── config/           # Configuration files (mongodb, redis, logger, etc.)
│   ├── controllers/      # Route controllers
│   ├── middlewares/      # Custom middlewares
│   ├── models/           # Database models
│   ├── plugins/          # Fastify plugins
│   ├── repositories/     # Data access layer
│   ├── routes/           # API routes
│   │   └── v1/           # API version 1 routes
│   ├── schemas/          # Validation schemas (including .env schema)
│   ├── services/         # Business logic
│   ├── types/            # TypeScript type definitions
│   ├── app.ts            # Application setup
│   └── server.ts         # Server entry point
├── test/                 # Test files
│   ├── services/         # Service unit tests
│   ├── utils/            # Test utilities
│   ├── setup.ts          # Test setup
│   └── app.test.ts       # Application tests
├── dist/                 # Compiled JavaScript output
├── .env.example          # Example environment variables
├── jest.config.js        # Jest configuration
├── tsconfig.json         # TypeScript configuration
├── Dockerfile            # Docker configuration
└── package.json          # Project metadata and dependencies
```

## Getting Started

1. **Install dependencies**

   ```bash
   pnpm install
   ```

2. **Configure environment**

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Start development server**

   ```bash
   pnpm dev
   ```

4. **Build for production**

   ```bash
   pnpm build
   ```

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `NODE_ENV` | Yes | - | Environment mode (`development`, `production`, `test`) |
| `PORT` | No | `8000` | Server port |
| `MONGODB_URL` | Yes | - | MongoDB connection URL |
| `REDIS_HOST` | Yes | `localhost` | Redis server hostname |
| `REDIS_PASS` | Yes | - | Redis server password |
| `CORS_ORIGINS` | No | - | Comma-separated list of allowed CORS origins |

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server with hot reloading |
| `pnpm build` | Compile TypeScript to JavaScript |
| `pnpm test` | Run test suite |
| `pnpm test:watch` | Run tests in watch mode |
| `pnpm test:coverage` | Run tests with coverage report |
| `pnpm test:ci` | Run tests for CI/CD |
| `pnpm lint` | Run ESLint |
| `pnpm lint:fix` | Run ESLint with auto-fix |
| `pnpm format` | Format code with Prettier |
| `npx tsc --noEmit` | Type check without compilation |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check endpoint |
| GET | `/api/v1/users` | User routes (example) |

## Docker

### Build the image

```bash
docker build -t fastify-app .
```

### Run the container

```bash
docker run -p 8000:8000 \
  -e NODE_ENV=production \
  -e MONGODB_URL=mongodb://host.docker.internal:27017/mydb \
  -e REDIS_HOST=host.docker.internal \
  -e REDIS_PASS=yourpassword \
  fastify-app
```

## Architecture

This project follows a **layered architecture** pattern:

```text
Routes → Controllers → Services → Repositories → Models
```

- **Routes**: Define API endpoints and request validation
- **Controllers**: Handle HTTP requests and responses
- **Services**: Contain business logic
- **Repositories**: Data access layer for database operations
- **Models**: Database schemas and models

### Autoload Conventions

Files are auto-loaded based on naming patterns:

- Services: `*Service.ts`
- Repositories: `*Repository.ts`
- Helpers: `*Helper.ts`

### Import Convention

This project uses ES modules. All imports must use `.js` extensions:

```typescript
import { userService } from './services/userService.js'
```

## Development Tools

- **TypeScript**: Type safety and modern JavaScript features
- **TSX**: Run TypeScript directly without compilation
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting
- **Jest**: Testing framework with TypeScript support

## License

ISC
