import { editUserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

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

    const { categories } = payload

    if (categories) {
      await user.related('categories').sync(categories)
    }
    
   await user.merge(payload).save()
   return response.redirect().toRoute('preferences.profile')
  }
}