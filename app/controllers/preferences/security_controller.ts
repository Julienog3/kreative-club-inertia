import UserService from '#services/user_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class SecurityController {
  constructor(protected userService: UserService) {}

  public async render({ inertia }: HttpContext) {
    return inertia.render('preferences/security')
  }
}