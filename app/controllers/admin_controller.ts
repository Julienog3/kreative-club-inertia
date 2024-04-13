import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class AdminController {
  public async general({ inertia }: HttpContext) {
    return await inertia.render('admin/general')
  } 

  public async users({ inertia }: HttpContext) {
    const users = await User.query()
    return await inertia.render('admin/users', { users })
  }
}