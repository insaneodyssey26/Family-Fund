import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  // Configure module resolution
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
  },
  // Configure build options
  build: {
    // Enable source maps
    sourcemap: true
  },
})
