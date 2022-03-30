import path from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'fs'
import { resolve, basename, dirname } from 'path'
import vue from '@vitejs/plugin-vue'
import { build } from 'vite'
import glob from 'fast-glob'
import dts from 'vite-plugin-dts'
import postcss from './../postcss.config.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const { dependencies } = JSON.parse(fs.readFileSync('./package.json'))
const external = ['vue', ...Object.keys(dependencies ?? [])]
const preserveModulesRoot = 'packages';

function packPeers() {
  const imports = []

  const getImports = () => {
    const files = glob.sync([resolve(__dirname, '../packages/**/index.vue')], {objectMode: true}) // get all component

    files.forEach(file => {
      let _dir = dirname(file.path)
      let _basename = basename(_dir)

      imports.push({
        name: _basename, // get base path name
        entry: file.path,
      })
    })
  }
  
  getImports()
  
  imports.forEach(async item => {
    await build({
      outDir: 'es',
      plugins: [
        dts({
          skipDiagnostics: false,
          logDiagnostics: true,
          cleanVueFileName: true,
          exclude: './src',
          beforeWriteFile(filePath, content) {
            return {
              filePath: filePath.replace(resolve(`./es/${preserveModulesRoot}`), resolve(`./es`)),
              content,
            };
          },
        }),
        vue()
      ],
      css: {
        postcss
      },
      build: {
        target: 'esnext',
        outDir: 'es',
        emptyOutDir: true,
        minify: false,
        brotliSize: false,
        lib: {
          entry: './packages',
          formats: ['es']
        },
        rollupOptions: {
          // 确保外部化处理那些你不想打包进库的依赖
          external,
          output: {
            preserveModules: true,
            preserveModulesRoot,
            // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
            globals: {
              vue: 'Vue'
            },
            assetFileNames: `${item.name}/[name].[ext]`,
            entryFileNames: () => `[name].js`,
          }
        }
      }
    })
  })
}

packPeers()