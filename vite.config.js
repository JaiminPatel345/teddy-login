import {
  defineConfig
} from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  preview: {
    host: '0.0.0.0', // Allow external connections
    port: 8080, // Default preview port
  },
  server: {
    port: 8080,
    strictPort: true,
    host: true,
    origin: "http://0.0.0.0:8080",
  },
  plugins: [react()],
})