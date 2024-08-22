import User from "#models/user";
import { cuid } from "@adonisjs/core/helpers";
import app from "@adonisjs/core/services/app";

export default class UserService {
  public async allCreatives() {
    const creatives = await User.query()
      .where('portfolioEnabled', true)
      .preload('categories')
      .preload('portfolioImages')
      .preload('portfolioImageAsThumbnail')
      
    return creatives.map((creative) => creative.serialize())
  }

  public async findCreativeBySlug(slug: string) {
    return await User.query()
      .where('username', slug)
      .preload('categories')
      .preload('portfolioFolders', (portfolioFoldersQuery) => {
        portfolioFoldersQuery.preload('portfolioImages')
      })
      .preload('portfolioImages')
      .firstOrFail()
  }

  public async updateUser(id: string, payload: any) {
    const user = await User.findOrFail(id)

    const { avatarFile, categories, ...updatedUser } = payload

    if (avatarFile) {
      const fileUrl = `${cuid()}.${avatarFile.extname}`
        await avatarFile.move(app.tmpPath('uploads', 'avatars'), {
        name: fileUrl
      })
      await user.merge({ avatar: '/uploads/avatars/' + fileUrl })
    }
      
    if (categories) {
      await user.related('categories').sync(categories)
    }

    await user.merge(updatedUser).save()
  }
  
  public async removeUser(id: string) {
    const user = await User.findOrFail(id)
    await user.delete()
  }
}