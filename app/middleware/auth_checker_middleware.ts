import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class AuthCheckerMiddleware {
  async handle(
    ctx: HttpContext,
    next: NextFn,
  ) {
    ctx.inertia.share({ user: async (ctx: HttpContext) => { 
      await ctx.auth.check()
      return ctx.auth?.user
    }})
    
    return next()
  }
}