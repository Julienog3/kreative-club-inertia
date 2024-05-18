import vine from '@vinejs/vine'

export const createPortfolioFolderValidator = vine.compile(
  vine.object({
    title: vine.string().minLength(6),
    description: vine.string().optional(),
  })  
)

export const setIllustrationImageValidator = vine.compile(
  vine.object({
    portfolioImageId: vine.string().uuid()
  })
)