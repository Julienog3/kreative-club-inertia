import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import type { Authenticators } from '@adonisjs/auth/types'
import logger from '@adonisjs/core/services/logger'

export default class AuthCheckerMiddleware {

  async handle(
    ctx: HttpContext,
    next: NextFn,
  ) {
    

    ctx.inertia.share({ user: async (ctx: HttpContext) => { 
      logger.info('auth checked')
      await ctx.auth.check()
      return ctx.auth?.user
    }})
    
    return next()
    
  }
}