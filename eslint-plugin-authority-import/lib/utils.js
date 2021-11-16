const path = require('path')
module.exports.isAuthority = function (config, matcher, currentPath, cwd) {
  let test = path.resolve(cwd, './src/store/index.ts')
  console.log(test === matcher)
  let _mathObj = config.filter(item => path.resolve(cwd, item.module) === matcher)
  let _mathPath

  if(!_mathObj.length) {
    return true
  }
  _mathPath = _mathObj[0].authorityList.filter(item => item === currentPath).length

  return !!_mathPath
}