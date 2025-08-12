/* eslint-env node */
/* global process */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    // Allow ngrok subdomains and localhost
    allowedHosts: ['.ngrok-free.app', 'localhost'],
    // HMR over ngrok (reads optional env for your tunnel domain)
    hmr: {
      host: process.env.VITE_PUBLIC_HOST || undefined,
      protocol: process.env.VITE_PUBLIC_PROTOCOL || undefined,
      clientPort: process.env.VITE_PUBLIC_CLIENT_PORT ? Number(process.env.VITE_PUBLIC_CLIENT_PORT) : undefined,
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
