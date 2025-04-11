# Fastify Boilerplate

A modern backend service built with Fastify, TypeScript, and MongoDB.

## Overview

This boilerplate provides a well-structured foundation for building scalable and maintainable Node.js applications using Fastify. It includes essential configurations, patterns, and tools to help you get started quickly with best practices in mind.

## Features

* **Fastify Framework**: Fast and low overhead web framework for Node.js
* **TypeScript Support**: Type safety for better development experience
* **MongoDB Integration**: Database connectivity with MongoDB
* **Redis Support**: Caching and data storage with Redis
* **API Versioning**: Built-in versioning structure for your APIs
* **Security**: Helmet for security headers
* **CORS Support**: Cross-origin resource sharing enabled
* **Health Checks**: Endpoint for monitoring service health
* **Graceful Shutdown**: Proper handling of application shutdown
* **Docker Support**: Containerization ready
* **Environment Configuration**: Structured environment variable management
* **Error Handling**: Centralized error handling
* **Request Logging**: Comprehensive request logging

## Project Structure

```
.
├── src/                  # Source code
│   ├── config/           # Configuration files
│   ├── controllers/      # Route controllers
│   ├── middlewares/      # Custom middlewares
│   ├── models/           # Database models
│   ├── plugins/          # Fastify plugins
│   ├── repositories/     # Data access layer
│   ├── routes/           # API routes
│   │   └── v1/           # API version 1 routes
│   ├── schemas/          # Validation schemas
│   ├── services/         # Business logic
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions
│   ├── app.ts            # Application setup
│   └── server.ts         # Server entry point
├── test/                 # Test files
├── dist/                 # Compiled JavaScript output
├── node_modules/         # Dependencies
├── .env                  # Environment variables
├── .env.example          # Example environment variables
├── .eslintrc.json        # ESLint configuration
├── tsconfig.json         # TypeScript configuration
├── package.json          # Project metadata and dependencies
└── Dockerfile            # Docker configuration
```

## Getting Started

To get started with the backend service, follow these steps:

1. Install the necessary dependencies by running `pnpm install`.
2. Set up your environment variables by copying `.env.example` to `.env` and updating the values.
3. Run the application in development mode by running `pnpm run dev`.
4. Build the application for production by running `pnpm run build`.

## Environment Configuration

The backend service uses environment variables for configuration. Important variables include:

* `NODE_ENV`: The environment mode (development, production, test)
* `REDIS_HOST`: The hostname or IP address of the Redis server
* `REDIS_PASS`: The password for the Redis server
* `MONGODB_URL`: The connection URL for MongoDB

## Folder Purposes

* **config/**: Contains configuration for various components like MongoDB, Redis, and logging
* **controllers/**: HTTP request handlers that invoke services and return responses
* **middlewares/**: Custom middleware functions to process requests
* **models/**: Data models and schemas for the database
* **plugins/**: Fastify plugins for extending functionality
* **repositories/**: Data access layer for interacting with databases
* **routes/**: API route definitions organized by version
* **schemas/**: JSON schemas for validating requests and responses
* **services/**: Contains business logic and orchestrates multiple operations
* **types/**: TypeScript type definitions and interfaces
* **utils/**: Helper functions and utilities used throughout the application

## Development Dependencies and Usage

This project uses several development dependencies to enhance the development experience:

* **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript
  * Usage: Provides type safety and modern JavaScript features
  * Command: `pnpm run build` compiles TypeScript to JavaScript

* **TSX**: A TypeScript execution engine and REPL for Node.js
  * Usage: Runs TypeScript files directly without separate compilation step
  * Command: `pnpm run dev` uses TSX to run and watch for changes

* **ESLint**: A static code analysis tool for identifying problematic patterns
  * Usage: Enforces code quality and consistency
  * Configuration: `.eslintrc.json`
  * Plugins:
    * `@typescript-eslint/eslint-plugin`: TypeScript-specific linting rules
    * `eslint-plugin-import`: Import/export syntax validation
    * `eslint-plugin-prettier`: Runs Prettier as an ESLint rule
    * `eslint-plugin-simple-import-sort`: Sorts import statements

* **Prettier**: An opinionated code formatter
  * Usage: Ensures consistent code formatting
  * Works with ESLint via `eslint-config-prettier` and `eslint-plugin-prettier`

* **Type Definitions**: TypeScript type definitions for libraries
  * `@types/node`: TypeScript types for Node.js
  * `@types/jsonwebtoken`: TypeScript types for JSON Web Tokens
  * `@types/lodash`: TypeScript types for Lodash

## Scripts

* `pnpm run dev`: Starts the development server with hot reloading
* `pnpm run build`: Compiles TypeScript code to JavaScript in the dist directory
* `pnpm test`: Runs the test suite (currently not configured)
