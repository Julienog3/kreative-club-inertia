import { UserFactory } from '#database/factories/user_factory'
import Category from '#models/category'
import User, { Role } from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await User.create({
      username: "admin",
      email: 'jauger@admin.com',
      password: "admin",
      firstName: "Julien",
      lastName: "Auger",
      role: Role.Admin,
      portfolioEnabled: true
    })

    const categories = await Category.all()
    const users = await UserFactory.createMany(10)

    await users[0].related('categories').sync([1 ,3 ,7])
    await users[1].related('categories').sync([4 ,6 ,10])
    await users[2].related('categories').sync([8 ,5 ,2])

    
    // await Promise.all([users.map(async (user) => {
    //   const categoriesShuffled = categories.sort(() => 0.5 - Math.random()).map(({ id }) => id);
    //   await user.related('categories').sync(categoriesShuffled.slice(0, 3))
    // })])

    // Write your database queries inside the run method
  }
}