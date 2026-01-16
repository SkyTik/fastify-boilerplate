import { AxiosInstance } from "axios";

declare module "fastify" {
  interface FastifyInstance {
    config: {
      NODE_ENV: string;
      PORT: number;
      REDIS_HOST: string;
      REDIS_PASS: string;
      MONGODB_URL: string;
      CORS_ORIGINS: string;
    };
    axios: {
      defaultClient: AxiosInstance;
    };
  }
}
