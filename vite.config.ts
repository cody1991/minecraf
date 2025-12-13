import { defineConfig } from 'vite'

export default defineConfig({
  base: '/minecraf/',
  server: {
    port: 5173,
    open: true
  },
  build: {
    target: 'esnext',
    outDir: 'dist'
  }
})
