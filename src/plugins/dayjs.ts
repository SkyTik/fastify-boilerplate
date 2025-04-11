import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";

import dayjs from "../config/dayjs.js";

const dayjsPlugin: FastifyPluginAsync = fp(async (fastify) => {
  fastify.decorate("dayjs", () => dayjs());
});

export default dayjsPlugin;
