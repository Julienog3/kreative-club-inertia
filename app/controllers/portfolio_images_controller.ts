import app from '@adonisjs/core/services/app';
import type { HttpContext } from '@adonisjs/core/http'
import { createPortfolioImageValidator, updatePortfolioImageValidator } from '#validators/portfolio_image';
import PortfolioImage from '#models/portfolio_image';
import PortfolioFolder from '#models/portfolio_folder';
import logger from '@adonisjs/core/services/logger';

export default class PortfolioImagesController {
  public async index({ params }: HttpContext) {
    return await PortfolioImage.query().where((query) => {
      query.where('userId', params.userId).whereNull('portfolioFolderId')
    })
  }

  public async show({ params }: HttpContext) {
    return await PortfolioImage.findOrFail(params.id)
  }

  public async store({ auth, request, response }: HttpContext): Promise<void> {  
    const user = await auth.getUserOrFail()
    const { image, ...portfolioImage } = await request.validateUsing(createPortfolioImageValidator)

    const { portfolioFolderId } = request.qs()

    if (image) {
      await image.move(app.tmpPath('uploads', 'portfolio', 'images'))
    }
    
    if (portfolioFolderId) {
      const portfolioFolder = await PortfolioFolder.findOrFail(portfolioFolderId)
      portfolioFolder.related('portfolioImages').create({...portfolioImage, image: '/uploads/portfolio/images/' + image.fileName, userId: user.id })
      return response.redirect().back()
    } 
    
    await user.related('portfolioImages').create({...portfolioImage, image: '/uploads/portfolio/images/' + image.fileName })
    return response.redirect().toRoute('preferences.portfolio')
  }

  public async update({ auth, params, request, response }: HttpContext) {
    // const user = auth.getUserOrFail()
    const payload = await request.validateUsing(updatePortfolioImageValidator)

    const portfolioImage = await PortfolioImage.findOrFail(params.portfolioImageId)

    await portfolioImage.merge(payload).save()
    return response.redirect().back()
  }

  public async destroy({ auth, params, response }: HttpContext): Promise<void> {
    const user = auth.getUserOrFail()
    const portfolioImage = await PortfolioImage.findOrFail(params.portfolioImageId)
    await portfolioImage.delete()
    return response.redirect().toRoute('preferences.portfolio')
  }

}
