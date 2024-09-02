import { deleteUser, editPortfolioImage, updateUser } from '#abilities/main'
import Category from '#models/category'
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

    const allCategories = await this.categoryService.getAllCategories()
    // let creatives = await this.userService.allCreatives()

    // const { categories } = await request.validateUsing(listCreativesValidator)

    const { sort, order, username } = request.qs()
    
    let query = User.query()
      .preload('categories')
      .preload('portfolioImages')
      .preload('portfolioImageAsThumbnail')
      .where('portfolioEnabled', true)

    if (username) {
      query
        .where('portfolioEnabled', true)
        .andWhereLike('username', `%${username}%`)
    }

    // if (categories) {
    //   categories.forEach((category) => {
    //     query
    //       .whereHas('categories', (categoriesQuery) => {
    //         categoriesQuery.where('id', category.id)
    //       })
    //   })
    // }

    if (sort && order) {
      query.orderBy(sort, order)
    }
    
    const creatives = await query
    let creativesToJSON = creatives.map((creative) => creative.serialize())

    if (auth.isAuthenticated) {
      const user = await auth.getUserOrFail()
      await user.load('bookmarks')
      
      creativesToJSON = creativesToJSON.map((creative) => {
        return ({
          isBookmarked: !!(user!.bookmarks.find(({ id }) => id === creative.id)),
          ...creative
        })
      })
    }

    return inertia.render('creatives/list', { creatives, categories: allCategories })
  }

  public async show({ inertia, params }: HttpContext) {
    const creative = await this.userService.findCreativeBySlug(params.slug)
    return inertia.render('creatives/single', { creative })
  }

  public async portfolio({ inertia, params, auth }: HttpContext) {
    const creative = await this.userService.findCreativeBySlug(params.slug)
    const isBookmarked = await auth.user?.related('bookmarks').query().where('creativeId', creative.id).first()

    const portfolioFolders = await PortfolioFolder.query().where('userId', creative.id).preload('portfolioImages')
    const portfolioImages = await PortfolioImage.query().where((query) => {
      query.where('userId', creative.id).whereNull('portfolioFolderId')
    })

    return inertia.render('creatives/portfolio', { creative, portfolioFolders, portfolioImages, isBookmarked: !!isBookmarked })
  }

  public async reviews({ inertia, params, auth }: HttpContext) {
    const creative = await this.userService.findCreativeBySlug(params.slug)
    const isBookmarked = await auth.user?.related('bookmarks').query().where('creativeId', creative.id).first()

    const reviews = await creative.related('sales').query().preload('reviews')

    return inertia.render('creatives/reviews', { creative, isBookmarked: !!isBookmarked })
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