module.exports = {
  extends: [
    'alloy',
    'alloy/react',
    'alloy/typescript',
  ],
  env: {
    // Your environments (which contains several predefined global variables)
    //
    browser: true,
    // node: true,
    // mocha: true,
    // jest: true,
    // jquery: true
  },
  globals: {
    // Your global variables (setting to false means it's not allowed to be reassigned)
    JSX: true,
  },
  rules: {
    // Customize your rules
    "react/no-unstable-nested-components": "off",
    'no-debugger': 0,
    "no-new": 0
  }
};