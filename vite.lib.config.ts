import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({ include: 'lib', rollupTypes: true })
  ],
  build: {
    lib: {
      entry: 'lib',
      fileName: 'index',
      cssFileName: 'styles',
      formats: ['es']
    },
    outDir: 'dist/lib',
    copyPublicDir: false,
    rollupOptions: {
      external: [/react\/?.*/, /react-dom\/?.*/]
    }
  }
})
