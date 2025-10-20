import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      // proxy /api/* to your backend
      '/api': {
        target: 'https://jp-backend-1-mtjn.onrender.com',
        changeOrigin: true,
        secure: false,
        // optionally remove the /api prefix if backend doesn't use it:
        // rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})