import { OrderDelay } from '#models/order_request'
import vine from '@vinejs/vine'

// step: vine.enum(['not-started', 'in-progress', 'done']).optional(),

export const createOrderValidator = vine.compile(
  vine.object({
    sellerId: vine.string().uuid({ version: [4] }),
    customerId: vine.string().uuid({ version: [4] }),    
    // step: vine.enum(['not-started', 'in-progress', 'done']).optional(),
    // paidAt: vine.any().optional()
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
