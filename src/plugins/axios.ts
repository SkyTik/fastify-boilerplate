import { FastifyInstance, FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";

import createAxiosInstance from "../config/axios.js";

const axiosPlugin: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  const defaultClient = createAxiosInstance({
    headers: {
      "User-Agent": "app user agent",
    },
  });

  fastify.decorate("axios", { defaultClient });
};

export default fp(axiosPlugin, {
  name: "axios",
});
