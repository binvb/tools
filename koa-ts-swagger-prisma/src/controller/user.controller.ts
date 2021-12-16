import { request, summary, path, query, body, responsesAll, tagsAll } from "koa-swagger-decorator"
import { PrismaClient } from '@prisma/client'
import { Context, Next } from 'koa'

const prisma = new PrismaClient()

@responsesAll({ 200: { description: "success"}, 400: { description: "bad request"}, 401: { description: "unauthorized, missing/wrong jwt token"}})
class User {
  @path({ id: { type: 'string', required: true } })
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
  @request('post', '/addUser')
  @body({
    email: {type: 'string', required: true},
    name: {type: 'string', required: true}
  })
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