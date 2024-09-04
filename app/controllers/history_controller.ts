import { showOrderAsCustomer } from '#abilities/main'
import type { HttpContext } from '@adonisjs/core/http'
import logger from '@adonisjs/core/services/logger'

export default class HistoryController {
  public async index({ inertia, auth }: HttpContext) {
    const user = await auth.getUserOrFail()
    const orders = await user.related('purchases')
      .query()
      .preload('messages')
      .preload('seller')
      .preload('steps')
      .preload('products')

    return inertia.render('history/index', { orders })
  }

  public async show({ inertia, bouncer, params, auth }: HttpContext) {
    const user = await auth.getUserOrFail()
    const { orderId } = params
    
    if (await bouncer.allows(showOrderAsCustomer, orderId)) {
      const order = await user.related('purchases')
        .query()
        .where('id', orderId)
        .preload('messages')
        .preload('seller')
        .preload('steps')
        .preload('products')
        .firstOrFail()

      logger.info('order', order)
        
      return await inertia.render('history/single', { order })    
    }
  }
}