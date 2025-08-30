import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,       // local network access
    port: 5174,       // dev server port
    strictPort: true, // fail if port in use
  },
  define: {
    'process.env': {} // Next.js imports ke liye temporary fix
  },
  build: {
    chunkSizeWarningLimit: 1500, // warning reduce
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom', 'framer-motion']
        }
      }
    }
  }
})
