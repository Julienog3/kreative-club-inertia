import PortfolioImage from '#models/portfolio_image'
import User from '#models/user'
import { Bouncer } from '@adonisjs/bouncer'

export const editPortfolioImage = Bouncer.ability((user: User, portfolioImage: PortfolioImage) => {
  return user.id === portfolioImage.userId
})