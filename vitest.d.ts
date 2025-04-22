// File: vitest.d.ts
import '@testing-library/jest-dom';

declare global {
  namespace Vi {
    interface JestAssertion {
      toBeInTheDocument(): void;
    }
  }
}