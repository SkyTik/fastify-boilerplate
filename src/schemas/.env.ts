const envSchema = {
  type: "object",
  required: ["REDIS_HOST","REDIS_PORT"],
  properties: {
    REDIS_HOST: { type: "string", default: "localhost" },
    REDIS_PORT: { type: "integer", default: 6379 },
  }
}

export default envSchema
