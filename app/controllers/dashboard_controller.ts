import { showOrderAsSeller } from '#abilities/main'
import Order from '#models/order'
import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class DashboardController {
  async index({ inertia, auth }: HttpContext) {
    const user = await auth.getUserOrFail()
    const creative = await User.query()
      .where('id', user.id)
      .preload('sales', (salesQuery) => {
        salesQuery
          .preload('customer')
          .preload('steps')
      }
      ).firstOrFail()

    return await inertia.render('dashboard/index', { creative })    
  }
  async show({ inertia, params, bouncer }: HttpContext) {
    const { orderId } = params
    
    if (await bouncer.allows(showOrderAsSeller, orderId)) {
      const order = await Order
        .query()
        .where('id', orderId)
        .preload('products')
        .preload('steps')
        .preload('customer')
        .firstOrFail()
      return await inertia.render('dashboard/single', { order })    
    }
  }
}