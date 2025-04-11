import { FastifyRedisPluginOptions } from "@fastify/redis";

const redisConfig: FastifyRedisPluginOptions = {
  db: 1,
  lazyConnect: true,
  retryStrategy: (times: number) => Math.min(times * 50, 2000),
};

export default redisConfig;
