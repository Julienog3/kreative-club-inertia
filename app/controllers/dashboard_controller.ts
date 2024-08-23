import Order from '#models/order'
import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class DashboardController {
  async index({ inertia, auth }: HttpContext) {
    const user = await auth.getUserOrFail()
    const creative = await User.query().where('id', user.id).preload('sales', (salesQuery) => {
      salesQuery.preload('customer')
    }).firstOrFail()

    return await inertia.render('dashboard/index', { creative })    
  }
}