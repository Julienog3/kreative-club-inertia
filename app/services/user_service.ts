import User from "#models/user";

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
}