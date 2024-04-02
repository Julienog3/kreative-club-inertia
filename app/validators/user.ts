import vine from '@vinejs/vine'

export const editUserValidator = vine.compile(
  vine.object({
    firstName: vine.string().optional(),
    lastName: vine.string().optional(),
    phoneNumber: vine.number().optional(),
    avatar: vine.file({ size: '2mb', extnames: ['jpg', 'png'] }).optional(),
    categories: vine.array(vine.number()).optional(),
  })
)

export const enablePortfolioValidator = vine.compile(
  vine.object({
    isEnabled: vine.boolean(),
  })
)
