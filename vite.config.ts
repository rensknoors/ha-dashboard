/// <reference types="vitest" />
import react from '@vitejs/plugin-react-swc';
import { URL, fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    svgr({
      svgrOptions: { typescript: true },
      esbuildOptions: { loader: 'tsx' },
    }),
  ],
  test: {
    globals: true,
    environment: 'happy-dom',
  },
  resolve: {
    alias: [
      {
        find: '@/',
        replacement: fileURLToPath(new URL('./src', import.meta.url)),
      },
      {
        find: '@/components',
        replacement: fileURLToPath(
          new URL('./src/components', import.meta.url)
        ),
      },
      {
        find: '@/hooks',
        replacement: fileURLToPath(new URL('./src/hooks', import.meta.url)),
      },
      {
        find: '@/routes',
        replacement: fileURLToPath(new URL('./src/routes', import.meta.url)),
      },
      {
        find: '@/assets',
        replacement: fileURLToPath(new URL('./src/assets', import.meta.url)),
      },
    ],
  },
});
