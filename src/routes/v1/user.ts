import { FastifyInstance, FastifyPluginAsync } from "fastify";

import { getUser } from "../../controllers/userController.js";

const massRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.get("/:userId", getUser);
};

export default massRoutes;
