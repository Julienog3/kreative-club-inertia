import transmit from '@adonisjs/transmit/services/main'
import type { HttpContext } from '@adonisjs/core/http'
import Order from '#models/order'

export default class ChatsController {
  public async store({ request, response, auth }: HttpContext) {
    const user = await auth.getUserOrFail()
    const { message, orderId } = request.only(['message', 'orderId'])

    const order = await Order.findOrFail(orderId)

    if (!message || !orderId) {
      return response.redirect().back()
    }

    transmit.broadcast(`messages/${orderId}`, { message, username: user.username, sendAt: Date.now() })
    await order.related('messages').create({ content: message, userId: user.id })
    
    return response.redirect().back()
  }
}