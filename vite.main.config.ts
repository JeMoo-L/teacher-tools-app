import { resolve } from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main/main.ts'),
      formats: ['cjs'], // 必须使用 CommonJS
      fileName: () => '[name].js',
    },
    outDir: '.vite/main',
    emptyOutDir: false, // 避免渲染进程构建时清空目录
    target: 'node16', // Node 环境
    minify: false, // 推荐关闭压缩方便调试
    sourcemap: true,
    rollupOptions: {
      external: ['electron'], // 确保 Electron 相关模块不会被打包进主进程
    },
  },
});
