import { AxiosInstance } from "axios";
import { Dayjs } from "dayjs";

declare module "fastify" {
  interface FastifyInstance {
    dayjs: () => Dayjs;
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
