import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/main.js',
      formats: ['system'],
      name: 'my-react-app',
    },
    rollupOptions: {
      output: {
        format: 'system',
      },
    },
  },
})
