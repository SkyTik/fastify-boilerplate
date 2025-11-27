const envSchema = {
  type: "object",
  required: ["NODE_ENV", "REDIS_HOST", "REDIS_PASS", "MONGODB_URL"],
  properties: {
    NODE_ENV: { type: "string", default: "" },
    PORT: { type: "number", default: 8000 },
    REDIS_HOST: { type: "string", default: "localhost" },
    REDIS_PASS: { type: "string", default: "" },
    MONGODB_URL: { type: "string" },
    CORS_ORIGINS: { type: "string", default: "" },
  },
};

export default envSchema;
