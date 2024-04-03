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

  public async addBookmark({ auth, params }: HttpContext) {
    const user: User = await auth.getUserOrFail()
    await user.related('bookmarks').attach([params.creativeId])
  }

  public async removeBookmark({ auth, params }: HttpContext) {
    const user: User = await auth.getUserOrFail()
    await user.related('bookmarks').detach([params.creativeId])
  }

  public async showBookmarks({ auth }: HttpContext) {
    const user: User = auth.getUserOrFail()
    return await user.related('bookmarks').query().preload('categories')
  }
}