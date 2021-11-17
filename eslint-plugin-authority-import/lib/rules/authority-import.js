const path = require('path')
const pathParse = require('path-parse')
const {isAuthority} = require('./../utils')

module.exports = {
  meta: {
      type: "problem",
      docs: {
          description: "a module which has authority",
          category: "Possible Errors",
          recommended: true,
          url: "https://github.com/binvb/tools/tree/main/eslint-plugin-authority-import"
      },
      fixable: "code",
      schema: [{
        type: 'object',
        properties: {}
      }]
  },
  create: function(context) {
    return {
      ImportDeclaration(node) {
        if(!context.settings || !context.settings.authorityImport) {
          return false
        }
        const cwd = context.getCwd()
        const currentPath = context.getPhysicalFilename() // current path
        const currentPathParse = pathParse(currentPath)
        const sourcePath = path.resolve(currentPathParse.dir, node.source.value) // authority resource path

        if(!isAuthority(context.settings.authorityImport, sourcePath, currentPath, cwd)) {
          context.report({
            node: node,
            message: `this module is not authority, please check eslint setttings propertity`
          })
        }
      }
    }
  }
};