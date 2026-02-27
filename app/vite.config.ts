import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  base: '/capivara-watcher-prototype/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api/camara': {
        target: 'https://dadosabertos.camara.leg.br/api/v2',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/camara/, ''),
      },
      '/api/senado': {
        target: 'https://legis.senado.leg.br/dadosabertos',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/senado/, ''),
      },
    },
  },
})
