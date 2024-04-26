import PortfolioImage from '#models/portfolio_image'
import User from '#models/user'
import UserService from '#services/user_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class UsersController {
  constructor(protected userService: UserService) {}

  public async index({ inertia, request, auth }: HttpContext) {
    let creatives = await this.userService.allCreatives()
    const { categories, username } = request.qs()
    
    if (username) {
      creatives = await User.query()
        .where('portfolioEnabled', true)
        .andWhereLike('username', `%${username}%`)
        .preload('categories')
        .preload('portfolioImages')
        .preload('portfolioImageAsThumbnail')
    }

    return inertia.render('creatives/list', { creatives })
  }

  public async show({ inertia, params }: HttpContext) {
    const creative = await User.query()
      .where('username', params.slug)
      .preload('categories')
      .preload('portfolioFolders', (portfolioFoldersQuery) => {
        portfolioFoldersQuery.preload('portfolioImages')
      })
      .preload('portfolioImages')
      .first()
    return inertia.render('creatives/single', { creative })
  }

  public async setPortfolioImageAsThumbnail({ auth, params, response }: HttpContext) {
    const portfolioImage = await PortfolioImage.findOrFail(params.id)
    const user = await auth.getUserOrFail()

    await user.related('portfolioImageAsThumbnail').save(portfolioImage)
    return await response.redirect().back()
  }

}