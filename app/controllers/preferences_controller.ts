import Category from '#models/category'
import PortfolioFolder from '#models/portfolio_folder'
import PortfolioImage from '#models/portfolio_image'
import { editUserValidator } from '#validators/user'
import { cuid } from '@adonisjs/core/helpers'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'

export default class PreferencesController {
  public async renderProfile({ inertia }: HttpContext) {
    return inertia.render('preferences/profile')
  }

  public async renderCreativeProfile({ inertia }: HttpContext) {
    const categories = await Category.query()
    return inertia.render('preferences/creative-profile', { categories })
  }

  public async renderNotifications({ inertia }: HttpContext) {
    return inertia.render('preferences/notifications')
  }

  public async renderSecurity({ inertia }: HttpContext) {
    return inertia.render('preferences/security')
  }

  public async renderPortfolio({ inertia, auth }: HttpContext) {
    const user = await auth.getUserOrFail()

    const portfolioFolders = await PortfolioFolder.query().where('userId', user.id).preload('portfolioImages')
    const portfolioImages = await PortfolioImage.query().where((query) => {
      query.where('userId', user.id).whereNull('portfolioFolderId')
    })
    
    return inertia.render('preferences/portfolio', {
      portfolioFolders,
      portfolioImages
    })
  }

  public async renderPortfolioFolderDetails({ inertia, params }: HttpContext) {
    const portfolioFolder = await PortfolioFolder.query().where('id', params.id).preload('portfolioImages').firstOrFail()

    return await inertia.render('preferences/portfolio-folder-details', { portfolioFolder })
  }

  public async editProfile({ auth, request, response }: HttpContext) {
    const user = await auth.getUserOrFail()
    const payload = await request.validateUsing(editUserValidator)

    const { avatar, categories, ...updatedUser } = payload

    if (avatar) {
      const fileUrl = `${cuid()}.${avatar.extname}`
      await avatar.move(app.tmpPath('uploads', 'avatars'), {
        name: fileUrl
      })
      await user.merge({ avatar: '/uploads/avatars/' + fileUrl })
    }
      
    if (categories) {
      await user.related('categories').sync(categories)
    }
    
   await user.merge(updatedUser).save()
   return response.redirect().toRoute('preferences.profile')
  }
}