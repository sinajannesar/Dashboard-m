import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./setup-tests.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // تنظیم alias برای اشاره به src
    },
  },
});