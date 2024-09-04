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
          .preload('messages')
          .preload('review')
      }
      ).firstOrFail()

    return await inertia.render('dashboard/index', { creative })    
  }
  async list({ auth, inertia }: HttpContext) {
    const user = await auth.getUserOrFail()
    const orders = await user.related('sales')
      .query()
      .preload('messages')
      .preload('customer')
      .preload('steps')
      .preload('products')

    return inertia.render('dashboard/list', { orders })
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
        .preload('messages')
        .firstOrFail()
      return await inertia.render('dashboard/single', { order })    
    }
  }
  async reviews({ auth, inertia }: HttpContext) {
    const user = await auth.getUserOrFail()
    const sales = await user.related('sales')
      .query()
      .preload('review')

    const reviews = sales.map((sale) => sale.review)

    return inertia.render('dashboard/reviews', { reviews })
  }
}