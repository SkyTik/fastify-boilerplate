import { Redis } from "ioredis";

declare module "fastify" {
  interface FastifyInstance {
    redis: Redis;
    config: {
      REDIS_HOST: string;
      REDIS_PORT: number;
    };
  }
}
