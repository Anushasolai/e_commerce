import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest', // Use ts-jest for TypeScript
  testEnvironment: 'jsdom', // Use jsdom for testing React components
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Transform TypeScript files
    '^.+\\.jsx?$': 'babel-jest', // Transform JavaScript files
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock CSS modules
  },
  transformIgnorePatterns: [
    '/node_modules/(?!@apollo/client)', // Allow transforming Apollo Client
  ],
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/dist/'], // Ignore certain paths
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'], // Add this line to include setup file
};

export default config;
