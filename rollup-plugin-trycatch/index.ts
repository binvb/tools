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
  body: BlockStatement
}

function addNode(tryCatchNode: TryCatchNode, _statementList: Statement[]) {
  tryCatchNode.body[0].block.body = _statementList

  return tryCatchNode.body
}

export default function tryCatchPlugin(options:Options):Plugin {
  const filter = createFilter(options.include)  
  const wrapType = ['FunctionDeclaration', 'FunctionExpression', 'ArrowFunctionExpression', 'ObjectMethod'] // handle type
  const tryCatchCode = `try{}catch(err){tryCatchHandle(err)}`
  // const {walk} = await import('estree-walker') // reference https://github.com/Rich-Harris/estree-walker/issues/26

  return {
    name: 'rollup-plugin-tryCatch',
    transform(code, id) {
      if (!filter(id)) return null

      let ast = this.parse(code)
      let tryCatchNode = this.parse(tryCatchCode)
      
      walk(ast, {
        enter(node) {
          if(wrapType.includes(node.type)) {   
            let _node = node as FnNode
            let _body = _node.body.body
            let _statementList = _body

            _node.body.body = addNode(tryCatchNode as any, _statementList)
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