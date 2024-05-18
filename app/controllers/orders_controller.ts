import OrderService from '#services/order_service'
import { createOrderValidator } from '#validators/order'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class OrdersController {
  constructor(protected orderService: OrderService) {
  }

  public async store({ auth, request, response }: HttpContext) {
    const user = await auth.getUserOrFail()
    const payload = await request.validateUsing(createOrderValidator)

    await this.orderService.create(payload)
    return response.redirect().back()
  }
}