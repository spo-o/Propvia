// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    // Only apply the proxy during development
    server: {
      proxy: mode === 'development'
        ? {
            '/api': {
              target: 'http://localhost:5050',
              changeOrigin: true,
              secure: false,
            },
          }
        : undefined,
    },
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
  };
});
