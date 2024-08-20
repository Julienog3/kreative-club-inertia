import { deleteUser, editPortfolioImage, updateUser } from '#abilities/main'
import PortfolioFolder from '#models/portfolio_folder'
import PortfolioImage from '#models/portfolio_image'
import User from '#models/user'
import CategoryService from '#services/category_service'
import UserService from '#services/user_service'
import { updateUserValidator } from '#validators/user'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class UsersController {
  constructor(protected userService: UserService, protected categoryService: CategoryService) {}

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

  public async portfolio({ inertia, params }: HttpContext) {
    const creative = await this.userService.findCreativeBySlug(params.slug)

    const portfolioFolders = await PortfolioFolder.query().where('userId', creative.id).preload('portfolioImages')
    const portfolioImages = await PortfolioImage.query().where((query) => {
      query.where('userId', creative.id).whereNull('portfolioFolderId')
    })

    return inertia.render('creatives/portfolio', { creative, portfolioFolders, portfolioImages })
  }

  public async reviews({ inertia, params }: HttpContext) {
    const creative = await this.userService.findCreativeBySlug(params.slug)
    return inertia.render('creatives/reviews', { creative })
  }

  public async getInTouch({ inertia, params }: HttpContext) {
    const creative = await this.userService.findCreativeBySlug(params.slug)
    const categories = await this.categoryService.getAllCategories()

    return inertia.render('creatives/get-in-touch', { creative, categories })
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

  public async update({ bouncer, params, response, request }: HttpContext) {
    const payload = await request.validateUsing(updateUserValidator)

    if (await bouncer.allows(updateUser, params.id)) {
      this.userService.updateUser(params.id, payload)
    }

    return response.redirect().back()
  }

  public async destroy({ bouncer, params, response }: HttpContext) {
    if (await bouncer.allows(deleteUser, params.id)) {
      this.userService.removeUser(params.id)
    }

    return await response.redirect().toRoute('home')
  }
}