import Agent from "agentkeepalive";
import axios, { CreateAxiosDefaults } from "axios";

const httpAgent = new Agent({
  maxSockets: 100,
  maxFreeSockets: 20,
  timeout: 20000,
  freeSocketTimeout: 10000,
});

const httpsAgent = new Agent.HttpsAgent({
  maxSockets: 100,
  maxFreeSockets: 20,
  timeout: 20000,
  freeSocketTimeout: 10000,
});

function createAxiosInstance(options: CreateAxiosDefaults = {}) {
  const defaultOptions: CreateAxiosDefaults = {
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "app name",
    },
    httpAgent,
    httpsAgent,
  };

  return axios.create({
    ...defaultOptions,
    ...options,
    headers: { ...defaultOptions.headers, ...options.headers },
  });
}

export default createAxiosInstance;
