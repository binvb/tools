import { request, summary, path, query, body, responsesAll, tagsAll } from "koa-swagger-decorator"
import { PrismaClient } from '@prisma/client'
import { Context, Next } from 'koa'

const prisma = new PrismaClient()
class User {
  public static async getUser(ctx: Context, next: Next) {
    let user = await prisma.user.findUnique({
      where: {
        id: +(ctx.query.id as string),
      },
    })

    ctx.status = 200
    ctx.body = user
  }
  public static async getUserRaw(ctx: Context, next: Next) {
    let user = await prisma.$queryRaw`select * from user where id=${ctx.query.id};`

    ctx.status = 200
    ctx.body = user
  }
  public static async addUser(ctx:Context, next:Next) {
    await prisma.user.create({
      data: {
        email: ctx.request.body.email as string,
        name: ctx.request.body.name as string
      }
    })
    ctx.status = 200
    ctx.body = ''
  }
  public static async addUserRaw(ctx:Context, next:Next) {
    await prisma.$executeRaw`insert into user value(${null}, ${ctx.request.body.email}, ${ctx.request.body.name});`
    ctx.status = 200
    ctx.body = ''
  }
  public static async updateUser(ctx:Context, next:Next) {
    await prisma.user.update({
      where: {
        id: ctx.request.body.id as number
      },
      data: {
        email: ctx.request.body.email as string,
        name: ctx.request.body.name as string
      }
    })
    ctx.status = 200
    ctx.body = ''
  }
  public static async delUser(ctx:Context, next:Next) {
    await prisma.user.delete({
      where: {
        id: +(ctx.query.id as string)
      }
    })
    ctx.status = 200
    ctx.body = ''
  }
}

export default User