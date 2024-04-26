import factory from '@adonisjs/lucid/factories'
import User from '#models/user'
import { CategoryFactory } from '#database/factories/category_factory'

export const UserFactory = factory
  .define(User, async ({ faker }) => {
    return {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      phoneNumber: faker.phone.number(),
      password: faker.internet.password(),
      portfolioEnabled: true,
      avatar: faker.image.avatar(),
      description: faker.lorem.paragraph(),
      
    }
  })
  .relation('categories', () => CategoryFactory) // 👈
  .build()