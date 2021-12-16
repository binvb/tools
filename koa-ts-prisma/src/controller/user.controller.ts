import { request, summary, path, query, body, responsesAll, tagsAll } from "koa-swagger-decorator"
import { PrismaClient } from '@prisma/client'
import { Context, Next } from 'koa'

const prisma = new PrismaClient()
class User {
  public static async getUser(ctx: Context, next: Next) {
    console.log(ctx.query)
    let user = await prisma.user.findUnique({
      where: {
        id: 1,
      },
    })

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
}

export default User