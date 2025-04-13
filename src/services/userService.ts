import { FastifyBaseLogger, FastifyInstance, FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import { IUserRepository } from "repositories/userRepository.js";

import { User } from "../types/user.js";

interface IUserService {
  getUser(userId: string): Promise<User | null>;
}

declare module "fastify" {
  interface FastifyInstance {
    userService: IUserService;
  }
}

class UserService implements IUserService {
  constructor(
    private readonly log: FastifyBaseLogger,
    private readonly userRepository: IUserRepository,
  ) {}

  async getUser(userId: string): Promise<User | null> {
    return this.userRepository.getUser(userId);
  }
}

const userServicePlugin: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  const service = new UserService(fastify.log, fastify.userRepository);
  fastify.decorate("userService", service);
};

export default fp(userServicePlugin, {
  name: "userService",
  dependencies: ["userRepository"],
});
