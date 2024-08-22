import vine from '@vinejs/vine'

export const updateUserValidator = vine.compile(
  vine.object({
    firstName: vine.string().optional(),
    lastName: vine.string().optional(),
    phoneNumber: vine.number().optional(),
    avatarFile: vine.file({ size: '2mb', extnames: ['jpg', 'png'] }).optional(),
    categories: vine.array(vine.number()).optional(),
    portfolioEnabled: vine.boolean().optional(),
    description: vine.string().optional()
  })
)

export const enablePortfolioValidator = vine.compile(
  vine.object({
    isEnabled: vine.boolean(),
  })
)
