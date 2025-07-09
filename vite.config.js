import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    emptyOutDir: true,
    rollupOptions: {
      output: {
        // Chunking libraries into a separate file for better caching
        manualChunks: {
          vendor: ['react', 'react-dom'] // Modify as per your app dependencies
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true
  }
})
