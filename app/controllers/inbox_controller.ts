import Order from '#models/order'
import OrderRequest from '#models/order_request'
import type { HttpContext } from '@adonisjs/core/http'

export default class InboxController {
  public async index({ auth, inertia }: HttpContext) {
    const user = await auth.getUserOrFail()
    const purchases = await user.related('purchases')
      .query()
      .preload('customer')
      .preload('seller')
      .preload('messages')
    const sales = await user.related('sales')
      .query()
      .preload('customer')
      .preload('seller')
      .preload('messages')

    return await inertia.render('messages/list', { purchases, sales })
  }

  public async show({ auth, inertia, params }: HttpContext) {
    const user = await auth.getUserOrFail()
    const order = await Order
      .query()
      .where('id', params.orderId)
      .preload('customer')
      .preload('seller')
      .preload('messages', (messagesQuery) => {
        messagesQuery.preload('user')
      })
      .preload('steps')
      .preload('files')
      .firstOrFail()

    const orderRequest = await OrderRequest.query().where('orderId', order.id).preload('categories').firstOrFail()

    const purchases = await user.related('purchases')
      .query()
      .preload('customer')
      .preload('seller')
      .preload('messages')

    const sales = await user.related('sales')
      .query()
      .preload('customer')
      .preload('seller')
      .preload('messages')

    return await inertia.render('messages/single', { purchases, sales, order, orderRequest })
  }
}