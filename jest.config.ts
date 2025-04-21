import '@testing-library/jest-dom';

export default {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // یا setupTests.ts
    testEnvironment: 'jsdom',
    // ...سایر تنظیمات
  };
  