import { FastifyMongodbOptions } from "@fastify/mongodb";

const mongodbConfig: FastifyMongodbOptions = {
  appName: "app name",
  maxIdleTimeMS: 30000,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 10000,
  serverSelectionTimeoutMS: 10000,
};

export default mongodbConfig;
