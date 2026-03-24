import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        products: resolve(__dirname, 'products.html'),
        facilities: resolve(__dirname, 'facilities.html'),
        sustainability: resolve(__dirname, 'sustainability.html'),
        contact: resolve(__dirname, 'contact.html'),
      },
    },
  },
})
