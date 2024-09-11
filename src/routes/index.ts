import { FastifyInstance, FastifyPluginAsync, FastifyRequest } from "fastify";

const routes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.get("/", async () => {
    return { hello: "world" };
  });

  fastify.get("/hello/:name", async (request: FastifyRequest) => {
    const { name } = request.params as { name: string };

    // Assuming you have registered the Redis plugin with Fastify
    const redis = fastify.redis;

    // Save the name to Redis
    await redis.set(`user:${name}`, name);
    return { hello: name, saved: true };
  });
};

export default routes;
