import { FastifyInstance, FastifyPluginAsync } from "fastify";

import { getUser } from "../../controllers/userController.js";

const userRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.get("/:userId", getUser);
};

export default userRoutes;
