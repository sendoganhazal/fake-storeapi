import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  
  // moduleNameMapper: {
  //   '^@/components/(.*)$': path.join(__dirname, 'components', '$1'),
  //   '^@/lib/(.*)$': path.join(__dirname, 'lib', '$1'),
  //   '^@/contexts/(.*)$': path.join(__dirname, 'contexts', '$1'),
  //   '^@/types/(.*)$': path.join(__dirname, 'types', '$1'),
  //   '^@/app/(.*)$': path.join(__dirname, 'app', '$1'),
  // },
  preset: 'ts-jest',

  collectCoverage: true,
  collectCoverageFrom: [
    'components/**/*.{ts,tsx}',
    'app/**/*.{ts,tsx}',
    '!app/layout.tsx',
    '!app/registry.tsx',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 60,
      lines: 60,
      statements: 60,
    },
  },
  coverageReporters: ['json-summary', 'text', 'lcov'], // Farklı rapor formatları
};

export default createJestConfig(config);
