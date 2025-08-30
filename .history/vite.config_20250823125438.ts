// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Try adding this
    port: 5173,
    hmr: {
      clientPort: 5173 // Add this if using a proxy
    }
  }
})