import { OrderDelay } from '#models/order_request'
import vine from '@vinejs/vine'

export const createOrderValidator = vine.compile(
  vine.object({
    sellerId: vine.string().uuid({ version: [4] }),
    customerId: vine.string().uuid({ version: [4] }),    
  })
)

export const createOrderRequestValidator = vine.compile(
  vine.object({
    type: vine.string(),
    description: vine.string(),
    delay: vine.enum(OrderDelay),
    categories: vine.array(vine.number())
  })
)

export const createOrderProductValidator = vine.compile(
  vine.object({
    products: vine.array(
      vine.object({
        name: vine.string(),
        price: vine.number(),
        quantity: vine.number(),
        duration: vine.number(),
        details: vine.string(),
      })
    )
  })
)

export const createOrderStepValidator = vine.compile(
  vine.object({
    name: vine.enum(['pending', 'quote-created','quote-validated', 'payment-done', 'order-validated', 'review-submitted']),
  })
)

export const createOrderFileValidator = vine.compile(
  vine.object({
    files: vine.array(vine.file({ size: '2mb', extnames: ['jpg', 'png'] }))
  })
)

export const createReviewValidator = vine.compile(
  vine.object({
    score: vine.number().range([1, 5]),
    description: vine.string().minLength(60)
  })
)
