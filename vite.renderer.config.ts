import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  root: './src/renderer', // 确保 Vite 读取 `index.html`
  plugins: [react()],
  css: {
    postcss: {
      plugins: [require('@tailwindcss/postcss'), require('autoprefixer')],
    },
  },
  build: {
    outDir: '.vite/renderer', // 确保 Electron Forge 能找到 `index.html`
    emptyOutDir: true,
  },
});
