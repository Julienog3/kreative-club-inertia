import type { HttpContext } from '@adonisjs/core/http'

export default class BookmarksController {
  public async index({ auth, inertia }: HttpContext) {
    const user = await auth.getUserOrFail()
    const bookmarks = await user.related('bookmarks').query()
    return inertia.render('bookmarks', { bookmarks })
  }

  public async bookmark({ auth, response, params }: HttpContext) {
    const user = await auth.getUserOrFail()
    const creative = await user.related('bookmarks').query().where('creative_id', params.creativeId).first()

    if (creative) {
      await user.related('bookmarks').detach([params.creativeId])
    } else {
      await user.related('bookmarks').attach([params.creativeId])
    }

    return response.redirect().back()
  }
}