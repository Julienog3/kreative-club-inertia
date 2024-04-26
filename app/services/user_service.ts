import User from "#models/user";

export default class UserService {
  public async allCreatives() {
    return await User.query()
      .where('portfolioEnabled', true)
      .preload('categories')
      .preload('portfolioImages')
      .preload('portfolioImageAsThumbnail')
  }
}