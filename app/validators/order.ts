import vine from '@vinejs/vine'

export const createOrderValidator = vine.compile(
  vine.object({
    sellerId: vine.string().uuid({ version: [4] }),
    customerId: vine.string().uuid({ version: [4] }),
    step: vine.enum(['not-started', 'in-progress', 'done']).optional(),
    paidAt: vine.any().optional()
  })
)