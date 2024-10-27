import dotenv from 'dotenv';
import { STATUS_CODES } from './constants/statusCodes';
import { ERROR_MESSAGES } from './constants/errorMessages';

// Load environment variables from .env file if they aren’t already set (useful for local development)
dotenv.config();

// Define the current environment, defaulting to 'development' if not set
const env = process.env.NODE_ENV || 'development';

// Define base configuration with default values, which can be overridden by environment variables
const baseConfig = {
  // Server and port configurations
  port: parseInt(process.env.API_PORT || '3001', 10),
  baseUrl: process.env.BASE_URL || 'http://localhost:3001',

  // Database configuration (use specifics if you add a database)
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    user: process.env.DB_USER || 'user',
    password: process.env.DB_PASSWORD || 'password',
    name: process.env.DB_NAME || 'moviedb',
  },

  // Logging configuration
  logLevel: process.env.LOG_LEVEL || 'info',

  // Swagger documentation settings
  swaggerPath: process.env.SWAGGER_PATH || '/api/docs',

  // Error and status code constants
  constants: {
    statusCodes: STATUS_CODES,
    errorMessages: ERROR_MESSAGES,
  },
};

// Additional configuration overrides based on environment
const envConfig = {
  development: {
    ...baseConfig,
    baseUrl: process.env.BASE_URL || 'http://localhost:3001',
  },
  production: {
    ...baseConfig,
    // Use host and port settings for production, e.g., in a containerized or hosted environment
    baseUrl:
      process.env.BASE_URL ||
      `http://${process.env.HOST || 'localhost'}:${baseConfig.port}`,
  },
  test: {
    ...baseConfig,
    // Override database settings for testing (e.g., in-memory or mock database)
    database: {
      host: 'localhost',
      port: 5432,
      user: 'test',
      password: 'test',
      name: 'test_moviedb',
    },
  },
};

// Export configuration based on the current environment
const config = envConfig[env as keyof typeof envConfig] || baseConfig;

export default config;
