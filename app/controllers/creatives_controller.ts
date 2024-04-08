import PortfolioImage from '#models/portfolio_image'
import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class CreativesController {
  public async index({ inertia }: HttpContext) {
    const creatives = await User.query().where('portfolioEnabled', true).preload('categories').preload('portfolioImages')
    
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
}