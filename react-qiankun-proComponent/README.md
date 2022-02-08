## 背景

整理一套基础的管理后台框架:  
前端: react + qiankun + pro-component;  
后端: koa + swagger + typeOrm + mysql

使用 typescript 语言, alloy eslint 规范；

## 功能

1、登录/layout 集成;  
2、动态路由渲染;  
3、react demo 嵌套;  
4、基于 RBAC1 的权限系统集成;

### web

### server

启动服务之前需要配置好数据库连接信息，demo 使用本地 mysql 数据库;

```

```

### 问题记录

1、在引用 antd 时使用 less 会有 Module build failed 报错；  
是由 less@3 默认不允许内链 js 导致，[issue](https://github.com/ant-design/ant-design/issues/7927),解决方案有两种，一种是用 2.\*版本，另外一种是设置 lessOption: {javascriptEnabled: true} [具体连接](https://www.jianshu.com/p/779abdd339a9)

2、react strict mode 在 antd 下会有 findDOMNode 警告;  
[issue](https://github.com/ant-design/pro-components/issues/1144), antd 内部处理中，等待处理结果即可。
