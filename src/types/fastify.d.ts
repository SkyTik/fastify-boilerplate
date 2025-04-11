import { AxiosInstance } from "axios";
import { Dayjs } from "dayjs";

declare module "fastify" {
  interface FastifyInstance {
    dayjs: () => Dayjs;
    config: {
      NODE_ENV: string;
      REDIS_HOST: string;
      REDIS_PASS: string;
      MONGODB_URL: string;
    };
    axios: {
      defaultClient: AxiosInstance;
    };
  }
}
