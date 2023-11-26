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
    alias: {
      '@/': `${fileURLToPath(new URL('./src/', import.meta.url))}/`,
    },
  },
});
