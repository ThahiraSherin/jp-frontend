import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // local backend for development
        changeOrigin: true,
        secure: false,
        // uncomment if backend does NOT use /api prefix
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
