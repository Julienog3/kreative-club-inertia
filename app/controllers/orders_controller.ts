import OrderRequest from '#models/order_request'
import OrderService from '#services/order_service'
import { createOrderRequestValidator, createOrderValidator } from '#validators/order'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class OrdersController {
  constructor(protected orderService: OrderService) {}

  public async store({ auth, request, response }: HttpContext) {
    const user = await auth.getUserOrFail()
    const orderPayload = await request.validateUsing(createOrderValidator)
    const orderRequestPayload = await request.validateUsing(createOrderRequestValidator)

    const { categories, ...requestPayload } = orderRequestPayload

    const order = await user.related('purchases').create(orderPayload)
    const orderRequest = await OrderRequest.create({ ...requestPayload, orderId: order.id })
    orderRequest.related('categories').attach(categories)

    return response.redirect().toRoute('inbox.show', { orderId: order.id })
  }
}