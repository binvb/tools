### 使用

1、打包并将文件拷贝到服务目录下,并启动 http-server 查看报错;

```
git clone
cd sourcemap/demo/react-project
yarn
yarn build // "react-scripts build && cp build/static/js/*.map ./../../server/sourcemapDir",
```

2、启动 node 服务;

```
cd server
yarn
yarn start
```

3、发送错误到 node 服务上查看报错,e.g.

```
curl http://127.0.0.1:3005?source=***&lineno=***&colno=***
```
