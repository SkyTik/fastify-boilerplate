# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development Commands
- `pnpm run dev`: Start development server with hot reloading using tsx
- `pnpm run build`: Compile TypeScript to JavaScript in dist/ directory

### Testing Commands
- `pnpm test`: Run all tests using Jest
- `pnpm run test:watch`: Run tests in watch mode
- `pnpm run test:coverage`: Run tests with coverage report
- `pnpm run test:ci`: Run tests for CI/CD (no watch, with coverage)

### Code Quality Commands
- `pnpm run lint`: Run ESLint on source code
- `pnpm run lint:fix`: Run ESLint and auto-fix issues
- `pnpm run format`: Format code with Prettier
- `npx tsc --noEmit`: Type check without compilation

### Single Test Execution
- `pnpm test -- --testNamePattern="test name"`: Run a specific test by name
- `pnpm test -- path/to/test.test.ts`: Run tests in a specific file

## Architecture Overview

This is a Fastify-based TypeScript backend service with MongoDB and Redis integration, following a layered architecture pattern.

### Core Application Structure
- **src/app.ts**: Main application initialization, plugin registration, and middleware setup
- **src/server.ts**: Server entry point with graceful shutdown and error handling
- **src/routes/**: API route definitions with versioning (v1/, v2/, etc.)

### Key Architectural Patterns

#### Plugin-Based Architecture
The application heavily uses Fastify's plugin system with autoload:
- Plugins are auto-registered from `src/plugins/`
- Services, repositories, and helpers are auto-loaded with specific naming patterns
- Services must end with `Service.ts`, repositories with `Repository.ts`, helpers with `Helper.ts`

#### Layered Architecture
1. **Routes** (`src/routes/`): API endpoints organized by version
2. **Controllers** (`src/controllers/`): HTTP request handlers
3. **Services** (`src/services/`): Business logic layer
4. **Repositories** (`src/repositories/`): Data access layer
5. **Models** (`src/models/`): Database models and schemas

#### Configuration Management
- Environment validation using `@fastify/env` with schema in `src/schemas/.env.ts`
- Database configs in `src/config/` (mongodb.ts, redis.ts, logger.ts, etc.)
- Support for .env files in development mode

### Technology Stack
- **Framework**: Fastify with TypeScript
- **Database**: MongoDB with `@fastify/mongodb`
- **Cache**: Redis with `@fastify/redis`
- **Validation**: JSON schemas in `src/schemas/`
- **Security**: Helmet, CORS, multipart handling
- **Monitoring**: Health checks, request logging, graceful shutdown

### Important Implementation Details
- **ES modules with `.js` imports**: All imports must use `.js` extensions even for TypeScript files (e.g., `import './config/logger.js'`)
- **Autoload patterns**: Services must end with `Service.ts`, repositories with `Repository.ts`, helpers with `Helper.ts`
- Custom request logging that excludes /health endpoint (app.ts:140-156)
- Multipart file upload limits configured in app.ts:125-135
- Auto-generated request IDs using `randomUUID()`
- Centralized error handling with 500 responses (app.ts:159-162)
- Graceful shutdown with Redis/MongoDB cleanup (app.ts:164-176)

### Development Patterns
- Use repository pattern for database operations
- Services contain business logic and orchestrate repositories
- Controllers are thin wrappers that call services
- Environment variables are validated on startup
- Request/response logging with performance metrics

### Testing Patterns
- Tests are located in `test/` directory
- Use `app.inject()` for integration tests instead of supertest
- Mock services and repositories for unit tests
- Test files should end with `.test.ts` or `.spec.ts`
- Use `createTestApp()` helper for creating test Fastify instances
- Global test setup in `test/setup.ts` handles mock clearing

## Codebase Context

For quick codebase context, read `repomix-output.xml` which contains a packaged snapshot of the entire repository.
