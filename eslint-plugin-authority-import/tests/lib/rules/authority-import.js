let rule = require("../../../lib/rules/authority-import"),
    RuleTester = require("eslint").RuleTester;
const ruleTester = new RuleTester({
    parserOptions: {
        ecmaVersion: 7,
        sourceType: "module"
    },
    settings: {
        authorityImport: [
            {
                name: 'vb'
            }
        ]
    }
});
const options = [{
    module: './src/store/index.ts',
    authorityList: [
        './src/App.vue'
    ]
}]

// 运行测试用例
ruleTester.run("authority-import", rule, {
    // 正确的测试用例
    valid: [
        {
            code: `import { vb } from './index.ts'`,
            options
        }
    ],
    // 错误的测试用例
    invalid: [
        {
            code: `import { vb } from './src/store/index.ts'`,
            options,
            errors: [{
                message: 'this module is not authority to use',
                type: 'ImportDeclaration',
            }],
        }
    ]
});