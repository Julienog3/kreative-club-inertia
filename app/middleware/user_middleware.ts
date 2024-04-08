import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class UserMiddleware {
  async handle({ auth }: HttpContext, next: NextFn) {
    /**
     * Middleware logic goes here (before the next call)
     */


    // const isConnected = await auth.use('web').check()
    
    // if (!isConnected) {
    //   await auth.authenticate()
    // }
    /**
     * Call next method in the pipeline and return its output
     */
    const output = await next()
    return output
  }
}