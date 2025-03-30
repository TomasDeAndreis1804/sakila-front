import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://ec2-3-95-215-40.compute-1.amazonaws.com:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
    host: '0.0.0.0', // Permite conexiones externas
    port: 5173, // Usa el puerto especificado
    strictPort: true, // Asegura que se usa el puerto definido
    cors: true // Habilita CORS para evitar bloqueos
  }
})
