import { FastifyInstance } from 'fastify';
import initApp from '../../src/app.js';

/**
 * Create a test Fastify instance with test configuration
 */
export const createTestApp = async (): Promise<FastifyInstance> => {
  // Override environment variables for testing
  const originalEnv = { ...process.env };
  process.env.NODE_ENV = 'test';
  process.env.REDIS_HOST = 'localhost';
  process.env.REDIS_PASS = 'test';
  process.env.MONGODB_URL = 'mongodb://localhost:27017/fastify-test';
  
  const app = await initApp();
  
  // Restore original environment
  process.env = originalEnv;
  
  return app;
};

/**
 * Clean up test app instance
 */
export const cleanupTestApp = async (app: FastifyInstance): Promise<void> => {
  await app.close();
};