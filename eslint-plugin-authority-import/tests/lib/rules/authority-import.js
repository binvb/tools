const rule = require("../../../lib/rules/authority-import")
const RuleTester = require("eslint").RuleTester
const settings = {
    authorityImport: [{
        module: './src/store/index.ts',
        authorityList: [
            './src/App.vue'
        ]
    }]
}
const ruleTester = new RuleTester({
    parserOptions: {
        ecmaVersion: 7,
        sourceType: "module"
    },
    settings
});

// 运行测试用例
ruleTester.run("authority-import", rule, {
    // 正确的测试用例
    valid: [
        {
            code: `import { vb } from './index.ts'`
        }
    ],
    // 错误的测试用例
    invalid: [
        {
            code: `import { vb } from './src/store/index.ts'`,
            errors: [{
                message: 'this module is not authority, please check eslint setttings propertity',
                type: 'ImportDeclaration',
            }],
        }
    ]
});