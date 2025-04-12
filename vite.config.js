import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  server: {
    port: 5174,
    host: 'localhost',
    strictPort: true,
    https: false,
    cors: true,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
    },
  },
}))