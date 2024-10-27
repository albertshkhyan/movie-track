/* eslint-disable */
const nextJest = require('next/jest');

// Create Jest configuration compatible with Next.js
const createJestConfig = nextJest({
  dir: './',
});

// Jest configuration options
const customJestConfig = {
  preset: 'ts-jest', // Use ts-jest preset
  testEnvironment: 'jsdom', // Use jsdom for React testing
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Adjust this to match your path aliases
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Optional: for additional setup
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', // Transform TypeScript files
  },
};

module.exports = createJestConfig(customJestConfig);
