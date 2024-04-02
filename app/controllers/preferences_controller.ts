import { editUserValidator } from '#validators/user'
import { cuid } from '@adonisjs/core/helpers'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'

export default class PreferencesController {
  public async renderProfile({ inertia }: HttpContext) {
    return inertia.render('preferences/profile')
  }

  public async renderCreativeProfile({ inertia }: HttpContext) {
    return inertia.render('preferences/creative-profile')
  }

  public async renderNotifications({ inertia }: HttpContext) {
    return inertia.render('preferences/notifications')
  }

  public async renderSecurity({ inertia }: HttpContext) {
    return inertia.render('preferences/security')
  }

  public async renderPortfolio({ inertia }: HttpContext) {
    return inertia.render('preferences/portfolio')
  }

  public async editProfile({ auth, request, params, response }: HttpContext) {
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