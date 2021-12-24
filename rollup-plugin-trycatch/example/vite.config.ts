import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tryCatchPlugin from './../index'
import typescript from '@rollup/plugin-typescript';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), 
    typescript({lib: ["es5", "es6", "dom"], target: "es6"}),
    tryCatchPlugin({
      include: ['*.ts', '**/*.ts']
    })
  ]
})
