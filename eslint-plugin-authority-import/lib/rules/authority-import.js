const path = require('path')
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
        if(!context.options) {
          return false
        }
        const cwd = context.getCwd()
        const file = context.getPhysicalFilename()
        const sourcePath = path.resolve(cwd, node.source.value)

        if(!isAuthority(context.options, sourcePath, file, cwd)) {
          context.report({
            node: node,
            message: `this module is not authority to use`
          })
        }
      }
    }
  }
};