import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import postcss from './../postcss.config.mjs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    postcss
  }
})