/// <reference types="vitest" />
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { URL, fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    tailwindcss(),
    svgr({
      svgrOptions: { typescript: true },
      oxcOptions: { lang: 'tsx' },
    }),
  ],
  test: {
    globals: true,
    environment: 'happy-dom',
  },
  resolve: {
    alias: {
      '@/': `${fileURLToPath(new URL('./src/', import.meta.url))}/`,
      'lottie-react': fileURLToPath(
        new URL('./node_modules/lottie-react/build/index.es.js', import.meta.url)
      ),
    },
  },
});
