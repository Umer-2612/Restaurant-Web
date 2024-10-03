import { resolve } from 'path';

import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import react from '@vitejs/plugin-react';
import polyfillNode from 'rollup-plugin-polyfill-node';
import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  server: {
    port: 5000,
    host: true,
  },
  plugins: [
    react(),
    svgr({
      include: '**/*.svg',
      svgrOptions: {
        exportType: 'default',
      },
    }),
    eslintPlugin({
      cache: false,
      include: ['src/**/.js', 'src/**/.jsx', 'src/**/.ts', 'src/**/.tsx'],
    }),
    // Polyfill Node.js globals
    {
      ...polyfillNode(),
      enforce: 'post',
    },
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      'components': resolve(__dirname, 'src/components'),
      'store': resolve(__dirname, 'src/store'),
      'utils': resolve(__dirname, 'src/utils'),
      'assets': resolve(__dirname, 'src/assets'),
      'context': resolve(__dirname, 'src/context'),
      'layouts': resolve(__dirname, 'src/layouts'),
      'pages': resolve(__dirname, 'src/pages'),
      'config': resolve(__dirname, 'src/config'),
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      // Polyfill global and other Node.js globals
      define: {
        global: 'globalThis',
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
        }),
      ],
    },
  },
  server: {
    port: 5000,
  },
  build: {
    outDir: 'build',
  },
});
