import { Plugin } from 'rollup'
import { createFilter } from '@rollup/pluginutils'
import { walk } from 'estree-walker'
import { Node, BaseFunction, BlockStatement, Program, TryStatement, Statement } from 'estree'
import * as escodegen from 'escodegen'

interface Options {
  include: string[] // include files, e.g. ['*.ts+(|x)', '**/*.ts+(|x)']
}
interface TryCatchNode extends Program {
  body: TryStatement[]
}
interface FnNode extends BaseFunction {
  body: BlockStatement,
  id: any
}

function addNode(tryCatchNode: TryCatchNode, _statementList: Statement[]) {
  tryCatchNode.body[0].block.body = _statementList

  return tryCatchNode.body
}

export default function tryCatchPlugin(options:Options):Plugin {
  const filter = createFilter(options.include)  
  const wrapType = ['FunctionDeclaration', 'FunctionExpression', 'ArrowFunctionExpression', 'ObjectMethod'] // handle type
  let filePath = 'EmptyFilePath'
  let functionType = 'EmptyFunctionType'
  let functionName = 'EmptyFunctionName'

  return {
    name: 'rollup-plugin-tryCatch',
    transform(code, id) {
      if (!filter(id) && id) return null

      let ast = this.parse(code)
      let _this = this
      
      walk(ast, {
        enter(node) {
          let _node = node as FnNode

          if(wrapType.includes(_node.type)) {   
            let _body = _node.body.body

            id ? filePath = id : ''
            _node.type ? functionType = _node.type : ''
            _node.id && _node.id.name ? functionName = _node.id.name : ''

            let tryCatchCode = `try{}catch(err){tryCatchHandle(err, '${filePath}', '${functionType}', '${functionName}')}`
            let tryCatchNode = _this.parse(tryCatchCode)

            if(!_body || !_body.length) return false
            _node.body.body = addNode(tryCatchNode as any, _body)
            this.skip()
          }
        }
      })
      return {
        code: escodegen.generate(ast)
      }
    }
  }
}