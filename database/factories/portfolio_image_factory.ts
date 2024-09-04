import factory from '@adonisjs/lucid/factories'
import PortfolioImage from '#models/portfolio_image'

export const PortfolioImageFactory = factory
  .define(PortfolioImage, async ({ faker }) => {
    return {
      title: faker.word.words({count: { min: 1, max: 5 }}),
      isIllustration: true,
      image: faker.image.urlLoremFlickr()
    }
  })
  .build()