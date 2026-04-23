import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import dts from 'vite-plugin-dts'

export default defineConfig({
  server: {
    watch: {
      usePolling: true,      // Обязательно для Docker
      interval: 100,
    },
    host: true,
    port: 5173,
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'Vega',
      formats: ['es'],
      fileName: 'vega',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  plugins: [
    vue(),
    dts(),
  ],
})
