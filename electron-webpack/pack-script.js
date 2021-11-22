const path = require('path')
const fs = require('fs')
const {exec} = require('child_process')
let jsonData = require('./package.json')


async function init() {   
    let content = JSON.stringify(jsonData, null, 2)
    let fileDist = path.join(__dirname, './dist/package.json')

    await execPromise('yarn webpack') // 打包
    await fs.writeFileSync(fileDist, content) // 拷贝package.json,通过创建文件方式，有修改json的需求
    await execPromise('cp -r index.html styles.css renderer.js preload.js ./dist') // 拷贝打包应用需要的静态资源到dist目录下
    await execPromise('yarn', './dist') // 依赖安装
    await execPromise('yarn build', './dist') // 程序打包
}

function execPromise(cmd, _path) {
    return new Promise(function(resolve, reject) {
        try {
            console.log(`${cmd} ...`)
            exec(cmd, {cwd: _path}, function(err, stdout) {
                if (err) return reject(err);
                resolve(stdout);
            })
        }catch(error) {
            console.log(`错误: ${error}`)
        }
    })
}

init();