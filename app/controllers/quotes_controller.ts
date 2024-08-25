import { createQuote } from '#abilities/main'
import Order from '#models/order'
import type { HttpContext } from '@adonisjs/core/http'

export default class QuotesController {
  async render({ bouncer, inertia, params }: HttpContext) {
    const { orderId } = params
    
    if (await bouncer.allows(createQuote, orderId)) {
      const order = await Order.findOrFail(orderId)
      return await inertia.render('orders/quote', { order })
    }
  }
}