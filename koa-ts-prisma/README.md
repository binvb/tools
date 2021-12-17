### 背景

一直在用的 orm 框架是 typeorm，最近有一个比较热门的后起之秀 prisma，start 快到两千了。

本文就是来体验下 prisma，主要内容如下：  
1、如何使用 prisma;  
2、一些常见的问题记录(主要是之前使用 orm 框架的解决方案在 prisma 上的实现);  
3、总结;

### 使用

1、安装客户端和依赖;

```
// 客户端 执行一些数据操作，e.g. 生成表，同步表
yarn add @prisma/client
// 依赖
yarn add prisma
```

2、初始化;

```
1、创建项目(ts+koa);
2、创建数据库(我用的本地mysql服务作为测试);
3、生成prisma目录, 在根目录下执行 npx prisma init;
```

3、配置 model;

```
// schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}


model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
}
```

4、配置数据库连接;

```
// .env,使用的是本地mysql数据库，数据库名prisma
DATABASE_URL="mysql://root:123456@127.0.0.1:3306/prisma?sslpassword=123456"
```

5、初始化数据库表;

```
npx prisma db push
```

6、crud, e.g.

```
const prisma = new PrismaClient()
let user = await prisma.user.findUnique({
  where: {
    id: ctx.request.body.uid,
  },
})
```

更详细的内容请查看我的[源码](https://github.com/binvb/tools/tree/main/koa-ts-prisma)

### 问题记录

1、如何创建多个.prisma 文件;  
暂不支持，有[issue](https://github.com/prisma/prisma/issues/2377)跟进，目前的解决方案是通过脚本来合并文件;

2、如何创建连接池;  
每次实例化 prisma/client `new PrismaClient()` 都会创建连接池，需要使用单例模式或者配合 GraphQL 使用。e.g.

```
// 单例模式，配置全局变量使用prisma/client
import { PrismaClient } from "@prisma/client"

let prisma

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient()
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }

  prisma = global.prisma
}

export default prisma

// prisma + GraphQL
const prisma = new PrismaClient()

const server = new GraphQLServer({
  context: ({ request }) => ({
    prisma
    request,
  }),
  resolvers,
  typeDefs: __dirname + "/schema.graphql",
});
```

关联的[issue](https://github.com/prisma/prisma/issues/1983#issuecomment-619954713)

3、如何写原生 sql 语句;  
使用过 orm 框架的童鞋比较清楚，sql 语句复杂度非常高，很多 orm 框架并不能完整实现所有的 sql 语句，有些需求还是需要通过 sql 语句去实现。  
prisma 也提供了执行 sql 语句的方法，有两种方式，$queryRaw/$executeRaw。区别在于前者用于查询语句，后者用于执行语句。e.g.

```
// 具体请查看源码
await prisma.$queryRaw`select * from user where id=${ctx.query.id};`
await prisma.$executeRaw`insert into user value(${null}, ${ctx.request.body.email}, ${ctx.request.body.name});`
```

另也支持 unsafe 写法($queryRawUnsafe/$executeRawUnsafe, 不对 sql 语句处理，可能有注入风险)。

### 总结

因为之前一直在用 typeorm，所以在尝试使用 prisma 时候有点按照之前 orm 框架的思维模式来使用，感觉有点不习惯。  
我对联表(可能写的不多)没特别的痛感，所以在使用 prisma 过程中也没感觉到有快感。  
暂时不打算在业务中应用，等后面有机会尝试再看下是否有新的体会吧。

### 参考文档：

1、官方文档： https://www.prisma.io/docs/getting-started
