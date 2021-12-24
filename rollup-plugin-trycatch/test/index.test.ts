import tryCatchPlugin from './../index'
import { TransformHook, SourceDescription } from 'rollup'
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
  let plugin = await tryCatchPlugin({include: ['*']})

  transform = plugin.transform as TransformHook
})


test('FunctionDeclaration', async() => {
  let code = `
    function sum(a, b) {
      return a + b
    }
  `
  let expectCode = 'functionsum(a,b){try{returna+b;}catch(err){tryCatchHandle(err);}}'
  let souceCode = await transform.call(transformContext as any, code, '') as SourceDescription

  expect(souceCode.code.replace(/\s/g, '')).toBe(expectCode)
})

test('FunctionExpression', async() => {
  let code = `const sum = function(a, b) {return a + b}`
  let expectCode = 'constsum=function(a,b){try{returna+b;}catch(err){tryCatchHandle(err);}};'
  let souceCode = await transform.call(transformContext as any, code, '') as SourceDescription

  expect(souceCode.code.replace(/\s/g, '')).toBe(expectCode)
})

test('ArrowFunctionExpression', async() => {
  let code = `const sum = (a, b) => {return a + b}`
  let expectCode = 'constsum=(a,b)=>{try{returna+b;}catch(err){tryCatchHandle(err);}};'
  let souceCode = await transform.call(transformContext as any, code, '') as SourceDescription

  expect(souceCode.code.replace(/\s/g, '')).toBe(expectCode)
})

test('ArrowFunctionExpression', async() => {
  let code = `const sum = (a, b) => {return a + b}`
  let expectCode = 'constsum=(a,b)=>{try{returna+b;}catch(err){tryCatchHandle(err);}};'
  let souceCode = await transform.call(transformContext as any, code, '') as SourceDescription

  expect(souceCode.code.replace(/\s/g, '')).toBe(expectCode)
})


test('ObjectMethod', async() => {
  let code = `const sum = {
    sum: function(a, b) {return a + b}
  }`
  let expectCode = 'constsum={sum:function(a,b){try{returna+b;}catch(err){tryCatchHandle(err);}}};'
  let souceCode = await transform.call(transformContext as any, code, '') as SourceDescription

  expect(souceCode.code.replace(/\s/g, '')).toBe(expectCode)
})