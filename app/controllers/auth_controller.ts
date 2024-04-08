import type { HttpContext } from '@adonisjs/core/http'
import User from '../models/user.js'
import { registerUserValidator } from '#validators/auth'
import logger from '@adonisjs/core/services/logger'

export default class AuthController {
  async login({ auth, request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    const user = await User.verifyCredentials(email, password)

    await auth.use('web').login(user)
    return response.redirect().back()
  }

  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect().toRoute('/')
  }

  async register({ request, response }: HttpContext) {
    const payload = await request.validateUsing(registerUserValidator)
    await User.create(payload)

    return response.redirect().toRoute('/creatives')
  }

  async getMe({ auth }: HttpContext) {
    const user = await auth.authenticate()
    return user
  }
}
