## 背景

整理一套基础的管理后台框架:  
前端: react + qiankun + pro-component;  
后端: koa + swagger + typeOrm + mysql

使用 typescript 语言, alloy eslint 规范；

## 功能

1、登录/layout 集成;  
2、动态路由渲染;  
3、微前端集成;  
4、基于 RBAC1 的权限系统集成;

### 优化项

1、合并静态，尽量保证公用的框架/插件只有一份；  
2、优化打包速度(以空间换时间，需要自己考虑打包机的性能问题);  
3、提供了脚本来创建项目:

```
// 选择如下
1、是否需要服务端配置;
2、主项目or微服务(主项目作为支架，提供layout,接口转发，权限管理等功能；微服务则只处理业务逻辑);
```

### web

### server

启动服务之前需要配置好数据库连接信息，demo 使用本地 mysql 数据库;

```

```

### 说明

这块内容主要是为了方便使用此模板的用户，有一些地方提前理解有利于快速进行项目开发:  
1、默认登录账号/密码：admin/admin;  
2、默认请求本地 mysql 数据库，需要自行配置数据库访问权限;  
3、/api 这个 path 会转发到第三方服务，可在 config 中进行配置;  
4、为了方便，这里把微服务的其他项目都放到同一个目录下了，如果你也是考虑放到一个项目下，建议在发布时根据不同项目设置打包脚本;例如我只是更新了 demo1 这个微服务则只需要重新打包这个项目即可:

```
cd project/demo1
yarn build
```

当然，如果你不需要微服务，那只需要打包 main 项目即可(login 只需要发布一次，基本不用管了)

### 问题记录

1、在引用 antd 时使用 less 会有 Module build failed 报错；  
是由 less@3 默认不允许内链 js 导致，[issue](https://github.com/ant-design/ant-design/issues/7927),解决方案有两种，一种是用 2.\*版本，另外一种是设置 lessOption: {javascriptEnabled: true} [具体连接](https://www.jianshu.com/p/779abdd339a9)

2、react strict mode 在 antd 下会有 findDOMNode 警告;  
[issue](https://github.com/ant-design/pro-components/issues/1144)，这个要等待 antd 的处理，因为项目严重依赖 antd 而且因为是管理后台项目不会有太多非模板代码，我暂时不使用 strict mode;

3、react-router-dom 升级@6 很多更新;  
component => element, switch => Routes;[document](https://reactrouter.com/docs/en/v6/getting-started/overview)
