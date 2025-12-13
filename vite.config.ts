import { defineConfig } from 'vite'

export default defineConfig({
  base: '/minecraft/',
  server: {
    port: 5173,
    open: true
  },
  build: {
    target: 'esnext',
    outDir: 'dist'
  }
})
