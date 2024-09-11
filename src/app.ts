import "./config/dayjs.js";

import * as process from "node:process";

import fastifyCors from "@fastify/cors";
import fastifyEnv, { FastifyEnvOptions } from "@fastify/env";
import fastifyHelmet from "@fastify/helmet";
import { randomUUID } from "crypto";
import { fastify, FastifyInstance, FastifyRequest } from "fastify";

import customLogger from "./config/logger.js";
import redisPlugin from "./plugins/redis.js";
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
    uri: req.url,
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
  const app: FastifyInstance = fastify({
    logger: customLogger,
    disableRequestLogging: true,
    genReqId: () => randomUUID(),
  });

  await validateEnv(app);

  // Register middlewares
  app.register(fastifyHelmet);
  app.register(fastifyCors);

  // Register plugins
  app.register(redisPlugin, {
    host: app.config.REDIS_HOST,
    port: app.config.REDIS_PORT,
  });

  // Register routes
  app.register(routes);

  app.addHook("onRequest", (req, reply, done) => {
    app.log.info(extractRequest(req));
    done();
  });

  app.addHook("onResponse", (req, reply, done) => {
    app.log.info({
      ...extractRequest(req),
      status: reply.statusCode,
      request_time: reply.elapsedTime,
    });
    done();
  });

  // Handle unhandled errors
  app.setErrorHandler((error, _request, reply) => {
    app.log.error(error);
    reply.status(500).send({ message: "Something went wrong" });
  });

  return app;
};
export default initApp;
