import Order from '#models/order'
import { createOrderProductValidator } from '#validators/order'
import type { HttpContext } from '@adonisjs/core/http'

export default class OrderProductsController {
  public async store({ request, response, params }: HttpContext) {
    // TODO: Add ability
    const { orderId } = params
    const order = await Order.findOrFail(orderId)
    
    const { products } = await request.validateUsing(createOrderProductValidator)
    await order.related('products').createMany(products)
    await order.related('steps').create({ name: "quote-created" })    

    return response.redirect().toPath(`/inbox/${orderId}`)
  }
}