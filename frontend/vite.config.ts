import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // === CONFIGURACIÓN DEL SERVIDOR DE DESARROLLO ===
  server: {
    port: 5173,                    // Puerto del frontend (default de Vite)
    strictPort: true,              // Falla si el puerto está ocupado
    
    proxy: {
      // Redirige TODAS las peticiones que empiecen con /api al backend
      '/api': {
        target: 'http://localhost:3000',  // URL de tu backend (Express)
        changeOrigin: true,               // Cambia el origen de la petición
        secure: false,                    // Permite HTTP (no HTTPS) en desarrollo
        
        // Opcional: reescribe la URL si el backend no usa /api
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
      
      // Si usas WebSocket (socket.io, etc.)
      '/socket.io': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        ws: true,                         // Habilita WebSocket
      },
    },
  },

  // === CONFIGURACIÓN DEL BUILD (producción) ===
  build: {
    outDir: 'dist',                // Carpeta de salida
    sourcemap: true,               // Mapas de código para debug
  },
});