import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', // برای تست‌های React و شبیه‌سازی DOM
    globals: true, // برای استفاده از describe، it، expect بدون ایمپورت
    setupFiles: './vitest.setup.ts', // فایل اختیاری برای تنظیمات اضافی
    css: true, // پشتیبانی از CSS در تست‌ها (اختیاری)
  },
});