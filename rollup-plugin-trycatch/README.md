### usage

```
yarn add rollup-plugin-trycatch
// or
npm install rollup-plugin-trycatch
```

### example

```
git clone https://github.com/binvb/tools.git

cd rollup-plugin-trycatch/example
yarn build
```

### 注意问题

1、需要声明全局错误处理函数`tryCatchHandle`,e.g.

```
window.tryCatchHandle = (err, filePath, functionType, functionName) => {
  // 这里进行错误上报操作
  console.log(err, filePath, functionType, functionName)
}
```

### TODO

1、记录错误函数的行数(暂无记录错误行数方案);  
目前方案是 estree-walker 的 walk 方法每一行进行+1 操作;
