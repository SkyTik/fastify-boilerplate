import { FastifyReply, FastifyRequest } from "fastify";

async function getUser(req: FastifyRequest, res: FastifyReply) {
  const { userId } = req.params as { userId: string };

  const user = await req.server.userService.getUser(userId);

  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }

  res.send(user);
}

export { getUser };
