import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
  host: true,
  port: 5174,
  strictPort: true,
  hmr: { clientPort: 5174 }
},
 define: {
    'process.env': {} // temporary fix for any Next.js import
  }
})
