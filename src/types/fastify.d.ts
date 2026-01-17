import { AxiosInstance } from "axios";

interface RequestLogData {
  request_id: string;
  remote_ip: string;
  host: string;
  method: string;
  uri: string | undefined;
  user_agent: string | undefined;
  query: string;
  body: string;
  params: string;
}

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

  interface FastifyRequest {
    requestLogData?: RequestLogData;
  }
}
