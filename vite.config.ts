import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // penting untuk custom domain di root (bukan subfolder)
  build: {
    outDir: 'dist',
  },
})
