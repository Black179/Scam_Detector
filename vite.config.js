import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': '/src'
      }
    },
    server: {
      port: 3001,
      host: '0.0.0.0',
      allowedHosts: ['unparking-unsubtracted-ivy.ngrok-free.dev', '*.ngrok-free.dev', '*.ngrok.io', 'localhost'],
      cors: {
        origin: ['*'],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'ngrok-skip-browser-warning'],
        credentials: false
      },
      open: false,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, ngrok-skip-browser-warning',
        'ngrok-skip-browser-warning': 'true'
      },
      proxy: {
        '/api/ai': {
          target: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/api\/ai/, ''),
          configure: (proxy, _options) => {
            proxy.on('error', (err, _req, _res) => {
              console.log('proxy error', err);
            });
            proxy.on('proxyReq', (proxyReq, req, _res) => {
              console.log('Sending Request to Target:', req.method, req.url);
              proxyReq.setHeader('Content-Type', 'application/json');
            });
            proxy.on('proxyRes', (proxyRes, req, _res) => {
              console.log('Received Response from Target:', proxyRes.statusCode, req.url);
            });
          },
        }
      }
    },
    preview: {
      port: 3001,
      host: '0.0.0.0',
      cors: {
        origin: ['*'],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'ngrok-skip-browser-warning'],
        credentials: false
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, ngrok-skip-browser-warning',
        'ngrok-skip-browser-warning': 'true'
      },
      proxy: {
        '/api/ai': {
          target: env.VITE_AI_API_URL || 'https://your-ai-api-endpoint.com/chat',
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/api\/ai/, ''),
        }
      }
    },
    build: {
      outDir: 'dist',
      sourcemap: true
    },
    esbuild: {
      target: 'es2015'
    }
  }
})
