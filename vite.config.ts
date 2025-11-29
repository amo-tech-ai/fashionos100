
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Fix for __dirname in ES modules if needed, or use process.cwd()
const __dirname = path.resolve();

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
  },
  server: {
    port: 3000,
    open: true,
    host: true 
  }
});
