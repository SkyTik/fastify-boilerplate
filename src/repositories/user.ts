import { FastifyMongoObject, ObjectId } from "@fastify/mongodb";
import { FastifyBaseLogger, FastifyInstance, FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";

import { User } from "../types/user.js";

export interface IUserRepository {
  getUser(userId: string): Promise<User | null>;
}

declare module "fastify" {
  interface FastifyInstance {
    userRepository: IUserRepository;
  }
}

class UserRepository implements IUserRepository {
  constructor(
    private readonly mongodb: FastifyMongoObject,
    private readonly logger: FastifyBaseLogger,
  ) {}

  async getUser(userId: string): Promise<User | null> {
    const user = await this.mongodb.client
      .db("database")
      .collection("users")
      .findOne({ _id: new ObjectId(userId) });
    return user
      ? {
          _id: user._id.toString(),
          name: user.name,
          email: user.email,
        }
      : null;
  }
}

const UserRepositoryPlugin: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  const repository = new UserRepository(fastify.mongo, fastify.log);
  fastify.decorate("userRepository", repository);
};

export default fp(UserRepositoryPlugin, {
  name: "userRepository",
  dependencies: [],
});
