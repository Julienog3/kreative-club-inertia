import { createReview } from '#abilities/main'
import Order from '#models/order'
import { createReviewValidator } from '#validators/order'
import type { HttpContext } from '@adonisjs/core/http'

export default class ReviewsController {
  public async index() {}
  public async store({ request, response, bouncer }: HttpContext) {
    const { orderId } = request.params()
    const order = await Order.findOrFail(orderId)

    if (await bouncer.allows(createReview, orderId)) {
      const payload = await request.validateUsing(createReviewValidator)
      await order.related('review').create(payload)
      await order.related('steps').create({ name: 'review-submitted' })
    }

    return await response.redirect().back()
  }
}