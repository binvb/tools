const {sum, multiply} = require('./../count')

test('sum function', () => {
  expect(sum(1, 2)).toBe(3)
  expect(sum(0, 2)).toBe(2)
})

test('multiply function', () => {
  expect(multiply(1,2)).toBe(2)
  expect(multiply(0,2)).toBe(0)
})