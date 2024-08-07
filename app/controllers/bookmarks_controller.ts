import type { HttpContext } from '@adonisjs/core/http'

export default class BookmarksController {
  public async index({ request, auth, inertia }: HttpContext) {
    const user = await auth.getUserOrFail()
    await user.load('bookmarks')

    const { sort, order } = request.qs()

    let bookmarks;

    if (sort) {
      bookmarks = await user.related('bookmarks').query().orderBy(sort, order).preload('portfolioImageAsThumbnail')
    } else {
      bookmarks = await user.related('bookmarks').query().preload('portfolioImageAsThumbnail')
    }

    const bookmarksToJSON = bookmarks.map((bookmark) => ({
      isBookmarked: !!(user.bookmarks.find(({ id }) => id === bookmark.id)),
     ...bookmark.serialize()
    }))
    
    return inertia.render('bookmarks', { bookmarks: bookmarksToJSON })
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