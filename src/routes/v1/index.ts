import { FastifyInstance, FastifyPluginAsync } from "fastify";

import userRoute from "./user.js";

const v1Routes: FastifyPluginAsync = async (fastify: FastifyInstance): Promise<void> => {
  fastify.register(userRoute, { prefix: "/users" });
};

export default v1Routes;
