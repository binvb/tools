# eslint-plugin-authority-import

a plugin for eslint which can limit module/methods be import;

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-authority-import`:

```sh
npm install eslint-plugin-authority-import --save-dev
```

## Usage

Add `authority-import` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["authority-import"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "authority-import/authority-import": 2
  },
  "settings": {
    "authorityImport": [
      // demo
      {
        "module": "./src/components/authority.component.js",
        "authorityList": ["./src/vb.js"]
      }
    ]
  }
}
```

### TODO

1 缩小权限粒度，限制模块里某些方法的调用权限；  
2 支持 vue/react 模块;  
3 测试用例覆盖率；

## Supported Rules

- Fill in provided rules here
