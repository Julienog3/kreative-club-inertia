import User from '#models/user'
import { editUserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  public async edit({ request, params }: HttpContext) {
    const user = await User.findOrFail(params.id)
    const payload = await request.validateUsing(editUserValidator)

    const { categories } = payload

    if (categories) {
      await user.related('categories').sync(categories)
    }
    
    return await user.merge(payload).save()
  }
}