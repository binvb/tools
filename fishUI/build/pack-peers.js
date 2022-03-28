const { resolve, basename, dirname } = require('path')
const vue = require('@vitejs/plugin-vue')
const { build } = require('vite')
const glob = require('fast-glob')

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
        formats: ['es'],
      })
    })
  }
  
  getImports()
  
  imports.forEach(async item => {
    await build({
      outDir: 'dist',
      plugins: [vue()],
      build: {
        lib: item,
        rollupOptions: {
          // 确保外部化处理那些你不想打包进库的依赖
          external: ['vue'],
          output: {
            // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
            globals: {
              vue: 'Vue'
            },
            assetFileNames: `${item.name}/[name].[ext]`,
            entryFileNames: () => `${item.name}/index.[format].js`
          }
        }
      }
    })
  })
}

packPeers()
