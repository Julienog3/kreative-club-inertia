import Category from '#models/category'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Category.createMany([
      {
        title: "Peinture"
      },
      {
        title: "Modélisation 3D"
      },
      {
        title: "Photographie"
      },
      {
        title: "Design graphique"
      },
      {
        title: "Illustration"
      },
      {
        title: "Animation"
      },
      {
        title: "Typographie"
      },
      {
        title: "Photomanipulation"
      },
      {
        title: "Art conceptuel"
      },
      {
        title: "Infographie"
      }
    ])
    // Write your database queries inside the run method
  }
}