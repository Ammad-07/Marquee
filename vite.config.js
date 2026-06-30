import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        // Manual chunking keeps the heavy 3D stack out of the main bundle
        // so the first paint never waits on Three.js to download/parse.
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-three': ['three', '@react-three/fiber', '@react-three/drei'],
        },
      },
    },
    chunkSizeWarningLimit: 700,
  },
  server: {
    port: 5173,
    open: true,
  },
})
