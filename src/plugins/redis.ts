import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import Redis from "ioredis";

export interface RedisPluginOptions {
  host?: string;
  port?: number;
  db?: number;
}

const redisPlugin: FastifyPluginAsync<RedisPluginOptions> = async (
  fastify,
  options,
) => {
  const { host = "localhost", port = 6379, db = 0 } = options;

  const redis = new Redis({
    host,
    port,
    db,
    lazyConnect: true,
    retryStrategy: (times) => Math.min(times * 50, 2000),
  });

  fastify.addHook("onClose", (_instance, done) => {
    redis
      .quit()
      .then(() => done())
      .catch(done);
  });

  try {
    await redis.connect();
    fastify.log.info("Redis client connected");
    fastify.decorate("redis", redis);
  } catch (err) {
    fastify.log.error(`Redis connection error: ${err}`);
    throw err;
  }

  redis.on("error", (err) => {
    fastify.log.error(`Redis error: ${err}`);
  });
};

export default fp(redisPlugin, {
  name: "fastify-redis",
});
