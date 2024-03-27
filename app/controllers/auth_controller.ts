import type { HttpContext } from '@adonisjs/core/http'
import User from '../models/user.js'
import { registerUserValidator } from '#validators/auth'
import logger from '@adonisjs/core/services/logger'

export default class AuthController {
  async login({ auth, request }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    const user = await User.verifyCredentials(email, password)
    logger.info('user', user)

    await auth.use('web').login(user)
  }

  async logout({ auth }: HttpContext) {
    await auth.use('web').logout()
  }

  async register({ request }: HttpContext) {
    const payload = await request.validateUsing(registerUserValidator)
    const user = await User.create(payload)

    return user.preload('categories')
  }

  async getMe({ auth }: HttpContext) {
    const user = await auth.authenticate()
    return user
  }
}
