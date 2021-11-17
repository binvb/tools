module.exports = {
  extends: [
    'alloy',
    'alloy/react',
  ],
  plugins: ['authority-import'],
  env: {
    // Your environments (which contains several predefined global variables)
    //
    browser: true,
    node: true,
    // mocha: true,
    jest: true,
    // jquery: true
  },
  globals: {
    // Your global variables (setting to false means it's not allowed to be reassigned)
    //
    // myGlobal: false
  },
  rules: {
    // Customize your rules
    "authority-import/authority-import": 'error'
  },
  settings: {
    authorityImport: [
      {
        module: './src/components/authority.component',
        authorityList: [
            './src/vb.js'
        ]
      }
    ]
  }
};