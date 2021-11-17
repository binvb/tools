const path = require('path')

module.exports.isAuthority = function (config, sourcePath, currentPath, cwd) {
  let _matchObj = config.filter(item => path.resolve(cwd, item.module) === sourcePath) //check if import authority module
  let _matchConfigModule

  if(!_matchObj.length) {
    return true
  }
  _matchConfigModule = _matchObj[0].authorityList.filter(item => path.resolve(cwd, item) === currentPath).length

  return !!_matchConfigModule
}
