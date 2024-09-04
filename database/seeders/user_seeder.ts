import { PortfolioImageFactory } from '#database/factories/portfolio_image_factory'
import { UserFactory } from '#database/factories/user_factory'
import Category from '#models/category'
import User, { Role } from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const adminUser = await User.create({
      username: "admin",
      email: 'jauger@admin.com',
      password: "admin",
      firstName: "Julien",
      lastName: "Auger",
      role: Role.Admin,
      portfolioEnabled: true
    })


    await User.create({
      username: "jauger2",
      email: 'jauger@mail.com',
      password: "user",
      firstName: "Paul",
      lastName: "Auger",
      role: Role.Admin,
      portfolioEnabled: false
    })

    const users = await UserFactory.with('portfolioImages', 1).createMany(10)

    await users[0].related('categories').sync([1 ,3 ,7])
    await users[1].related('categories').sync([4 ,6 ,10])
    await users[2].related('categories').sync([5, 2])
    await users[3].related('categories').sync([2])
    await users[4].related('categories').sync([4, 3, 8])
    await users[5].related('categories').sync([9, 1])
    await users[6].related('categories').sync([6, 7, 2])

    // Write your database queries inside the run method
  }
}