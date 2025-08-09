export default async function globalSetup() {
  // Global setup logic that runs once before all test files
  console.log('🧪 Setting up Jest test environment...');
  
  // Set test environment variables
  process.env.NODE_ENV = 'test';
  process.env.REDIS_HOST = 'localhost';
  process.env.REDIS_PASS = 'test';
  process.env.MONGODB_URL = 'mongodb://localhost:27017/fastify-test';
}