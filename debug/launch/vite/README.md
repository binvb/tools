### 调试步骤

1、创建 vite 项目;

```
yarn create vite projectName --template vue-ts
```

2、设置 source-map;

```
// vite.config.ts
build: {
  sourcemap: true
}
```

3、设置 launch.json;

```
{
  "type": "chrome",
  "request": "launch",
  "name": "vuejs: chrome",
  "url": "http://localhost:3000", // 端口号注意和启动项目端口一致，默认3000
  "webRoot": "${workspaceFolder}/src",
  "breakOnLoad": true,
  "sourceMapPathOverrides": {
    "webpack:///src/*": "${webRoot}/*"
  }
}
```

4、启动项目;

```
yarn dev

```

5、launch && 设置断点;
