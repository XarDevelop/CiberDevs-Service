import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      {
        name: 'custom-favicon',
        transformIndexHtml(html) {
          return html.replace(/<link rel="icon" type="image\/svg\+xml".*?>/g, '');
        },
      },
    ],

    server: {
      port: 5173,
      strictPort: true,
      proxy: {
        '/api': {
          target: env.VITE_DEV_API_URL || 'http://localhost:3000',
          changeOrigin: true,
          secure: false,
        },
        '/socket.io': {
          target: env.VITE_DEV_API_URL || 'http://localhost:3000',
          changeOrigin: true,
          ws: true,
        },
      },
    },

    build: {
      outDir: 'dist',
      sourcemap: mode !== 'production',
    },
  };
});
