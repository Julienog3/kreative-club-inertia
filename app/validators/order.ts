import vine from '@vinejs/vine'

export const createOrderValidator = vine.compile(
  vine.object({
    customerId: vine.string(),
    sellerId: vine.string(),
    step: vine.string(),
    paidAt: vine.date().optional()
  })
)