# Backend
================

A simple backend service built with Fastify.

## Features

* Fastify-based web application
* CORS support for cross-origin resource sharing
* Helmet for security headers
* Redis plugin for caching and data storage
* Customizable configuration options

## Getting Started

To get started with the backend service, follow these steps:

1. Install the necessary dependencies by running `pnpm install`.
2. Set up your environment variables in a `.env` file or using your operating system's environment variable settings.
3. Run the application in development mode by running `pnpm run dev`.

## Configuration

The backend service uses environment variables for configuration. The following variables are supported:

* `REDIS_HOST`: the hostname or IP address of the Redis server
* `REDIS_PORT`: the port number of the Redis server

You can set these variables in a `.env` file or using your operating system's environment variable settings.
