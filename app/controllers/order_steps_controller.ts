import Order from '#models/order'
import { createOrderStepValidator } from '#validators/order'
import type { HttpContext } from '@adonisjs/core/http'



export default class OrderStepsController {
  public async store({ auth, params, response, request }: HttpContext) {
    const { orderId } = params
    const order = await Order.findOrFail(orderId)

    const payload = await request.validateUsing(createOrderStepValidator)
    order.related('steps').create(payload)

    return response.redirect().back()
  }
}