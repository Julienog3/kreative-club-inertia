import { editPortfolioImage } from '#abilities/main'
import PortfolioImage from '#models/portfolio_image'
import User from '#models/user'
import UserService from '#services/user_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class UsersController {
  constructor(protected userService: UserService) {}

  public async index({ inertia, request, auth }: HttpContext) {
    await auth.check()

    let creatives = await this.userService.allCreatives()
    const { username } = request.qs()
    
    if (username) {
      creatives = await User.query()
        .where('portfolioEnabled', true)
        .andWhereLike('username', `%${username}%`)
        .preload('categories')
        .preload('portfolioImages')
        .preload('portfolioImageAsThumbnail')

      creatives = creatives.map((creative) => creative.serialize())
    }

    if (auth.isAuthenticated) {
      const user = await auth.getUserOrFail()
      await user.load('bookmarks')
      
      creatives = creatives.map((creative) => {
        return ({
          isBookmarked: !!(user!.bookmarks.find(({ id }) => id === creative.id)),
          ...creative
        })
      })
    }

    return inertia.render('creatives/list', { creatives })
  }

  public async show({ inertia, params }: HttpContext) {
    const creative = await this.userService.findCreativeBySlug(params.slug)
    return inertia.render('creatives/single', { creative })
  }

  public async setPortfolioImageAsThumbnail({ bouncer, auth, params, response }: HttpContext) {
    const user = await auth.getUserOrFail()
    const portfolioImage = await PortfolioImage.findOrFail(params.id)

    if (await bouncer.allows(editPortfolioImage, portfolioImage)) {
      const previousPortfolioImageAsThumbnail = await PortfolioImage.query().where('userId', user.id).andWhere('isIllustration', true).first()

      if (previousPortfolioImageAsThumbnail) {
        await previousPortfolioImageAsThumbnail.merge({ isIllustration: false }).save()
      }

      await portfolioImage.merge({ isIllustration: true }).save()
    }

    return await response.redirect().back()
  }

}