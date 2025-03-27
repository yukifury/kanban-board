import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom', // Должно быть jsdom, а не node
  },
  server: {
    allowedHosts: ['29d8-2a01-b340-83-6378-ad31-2078-9bd7-c263.ngrok-free.app'],
  },
});
