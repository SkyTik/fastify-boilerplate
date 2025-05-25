import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import autoload from "@fastify/autoload";
import fastifyCors from "@fastify/cors";
import fastifyEnv, { FastifyEnvOptions } from "@fastify/env";
import fastifyHelmet from "@fastify/helmet";
import mongodbPlugin from "@fastify/mongodb";
import fastifyMultipart from "@fastify/multipart";
import redisPlugin from "@fastify/redis";
import { randomUUID } from "crypto";
import { fastify, FastifyInstance, FastifyRequest } from "fastify";
import fastifyGracefulShutdown from "fastify-graceful-shutdown";
import fastifyHealthcheck from "fastify-healthcheck";

import customLogger from "./config/logger.js";
import mongodbConfig from "./config/mongodb.js";
import redisConfig from "./config/redis.js";
import routes from "./routes/index.js";
import envSchema from "./schemas/.env.js";

/**
 * Validate the environment variables using the `fastify-env` plugin.
 * The `fastify-env` plugin will validate the environment variables against the
 * `envSchema` schema and throw an error if any of the variables are invalid or
 * missing.
 *
 * @param app - The Fastify instance.
 */
const validateEnv = async (app: FastifyInstance) => {
  const options: FastifyEnvOptions = {
    schema: envSchema,
    data: process.env,
  };

  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    options.dotenv = true;
  }

  await app.register(fastifyEnv, options);
};

const extractRequest = (req: FastifyRequest) => {
  return {
    request_id: req.id,
    remote_ip: req.ips?.[-1] ?? req.ip,
    host: req.hostname,
    method: req.method,
    uri: req.routeOptions.url,
    user_agent: req.headers["user-agent"],
    query: JSON.stringify(req.query),
    body: req.body ? JSON.stringify(req.body) : "{}",
    params: JSON.stringify(req.params),
  };
};

/**
 * Initializes the Fastify application.
 *
 * @returns The Fastify application instance.
 */
const initApp = async (): Promise<FastifyInstance> => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const app: FastifyInstance = fastify({
    logger: customLogger,
    disableRequestLogging: true,
    genReqId: () => randomUUID(),
  });

  await validateEnv(app);

  // Register middlewares
  app.register(fastifyHelmet);
  app.register(fastifyCors);
  app.register(fastifyHealthcheck);
  app.register(fastifyGracefulShutdown);

  // Register plugins
  app.register(redisPlugin, {
    host: app.config.REDIS_HOST,
    password: app.config.REDIS_PASS,
    ...redisConfig,
  });

  app.register(mongodbPlugin, { url: app.config.MONGODB_URL, forceClose: true, ...mongodbConfig });

  // Register all custom plugins
  app.register(autoload, {
    dir: join(__dirname, "plugins"),
  });

  // Register repositories
  app.register(autoload, {
    dir: join(__dirname, "helpers"),
    // This pattern ignores any files that do not end with 'Helper.js' or 'Helper.ts'.
    ignorePattern: /^(?!(.*Helper\.(js|ts)$)).*\.(js|ts)$$/,
  });

  // Register repositories
  app.register(autoload, {
    dir: join(__dirname, "repositories"),
    // This pattern ignores any files that do not end with 'Repository.js' or 'Repository.ts'.
    ignorePattern: /^(?!(.*Repository\.(js|ts)$)).*\.(js|ts)$$/,
  });

  // Register custom services
  app.register(autoload, {
    dir: join(__dirname, "services"),
    // This pattern ignores any files that do not end with 'Service.js' or 'Service.ts'.
    ignorePattern: /^(?!(.*Service\.(js|ts)$)).*\.(js|ts)$$/,
  });

  app.register(fastifyMultipart, {
    limits: {
      fieldNameSize: 100, // Max field name size in bytes
      fieldSize: 100, // Max field value size in bytes
      fields: 10, // Max number of non-file fields
      fileSize: 10000000, // For multipart forms, the max file size in bytes
      files: 1, // Max number of file fields
      headerPairs: 2000, // Max number of header key=>value pairs
      parts: 1000, // For multipart forms, the max number of parts (fields + files)
    },
  });

  // Register routes
  app.register(routes);

  app.addHook("onRequest", (req, reply, done) => {
    if (req.routeOptions.url !== "/health" && process.env.NODE_ENV) {
      app.log.info(extractRequest(req));
    }
    done();
  });

  app.addHook("onResponse", (req, reply, done) => {
    if (req.routeOptions.url !== "/health" && process.env.NODE_ENV) {
      app.log.info({
        ...extractRequest(req),
        status: reply.statusCode,
        request_time: reply.elapsedTime,
      });
    }
    done();
  });

  // Handle unhandled errors
  app.setErrorHandler((error, _request, reply) => {
    app.log.error(error);
    reply.status(500).send({ message: "Something went wrong" });
  });

  // Setup graceful shutdown with HTTP agent cleanup
  app.after(() => {
    app.gracefulShutdown(async (signal) => {
      app.log.info(`Received signal to shutdown: ${signal}`);
      app.log.info("Graceful shutdown completed");
    });
  });

  app.log.info(`RUN WITH ENV: ${app.config.NODE_ENV}`);

  await app.ready();

  return app;

  return app;
};
export default initApp;
