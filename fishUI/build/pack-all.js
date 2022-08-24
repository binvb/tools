import { resolve } from 'path';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      outDir: './dist'
    })
  ],
  server: {
    open: true,
    port: 4000,
    host: '0.0.0.0'
  },
  build: {
    minify: false,
    outDir: 'dist',
    lib: {
      entry: resolve(__dirname, './../packages/index.ts'),
      name: 'FishUI',
      fileName: 'fish-ui',
      formats: ['es']
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})