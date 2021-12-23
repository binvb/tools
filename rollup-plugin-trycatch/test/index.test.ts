import tryCatchPlugin from './../index'
import { TransformHook, TransformPluginContext } from 'rollup'
import * as acorn from 'acorn'

const noop = () => {}
const transformContext = {
  parse: (input: string) =>
    acorn.parse(input, {
      ecmaVersion: 9,
      sourceType: 'module'
    }),
  skip: noop
}
let transform: TransformHook

beforeAll(async() => {
  let _result = await tryCatchPlugin({include: ['']})
  //@ts-ignore
  transform = _result.transform
})


test('FunctionDeclaration', () => {
  let code = `
    function sum(a, b) {
      return a + b
    }
  `
  let _transform = transform as TransformHook

  _transform.call(transformContext as any, code, '')
})