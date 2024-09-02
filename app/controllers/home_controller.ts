import User from '#models/user'
import UserService from '#services/user_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class HomeController {
  constructor(protected userService: UserService) {}

  public async render({ inertia, auth }: HttpContext) {
    await auth.check()

    const creatives = await User.query()
      .where('portfolioEnabled', true)
      .preload('categories')
      .preload('portfolioImages')
      .preload('portfolioImageAsThumbnail')
      .limit(3)

    return inertia.render(auth.isAuthenticated ? 'home-authenticated' : 'home', { creatives })
  }
}