const path = require('path')
const {isAuthority} = require('./../utils')

module.exports = {
  meta: {
      type: "suggestion",

      docs: {
          description: "disallow unnecessary semicolons",
          category: "Possible Errors",
          recommended: true,
          url: "https://eslint.org/docs/rules/no-extra-semi"
      },
      fixable: "code",
      schema: [{
        type: 'object',
        properties: {}
      }] // no options
  },
  create: function(context) {
    return {
      ImportDeclaration(node) {
        if(!context.options) {
          return false
        }
        const cwd = context.getCwd()
        const sourcePath = path.resolve(cwd, node.source.value)
        const currentPath = './src/index.vue'
        console.log(cwd)

        if(!isAuthority(context.options, sourcePath, currentPath, cwd)) {
          context.report({
            node: node,
            message: `this module is not authority to use ${sourcePath}`
          })
        }
      }
    }
  }
};