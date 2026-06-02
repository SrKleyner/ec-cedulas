import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        chile: 'chile.html',
        edad: 'edad.html',
      },
    },
  },
})
