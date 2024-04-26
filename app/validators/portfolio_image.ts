import vine from '@vinejs/vine'

export const createPortfolioImageValidator = vine.compile(
  vine.object({
    title: vine.string(),
    image: vine.file(),
  })
)

export const updatePortfolioImageValidator = vine.compile(
  vine.object({
    title: vine.string().optional(),
    // isIllustration: vine.boolean().optional()
  })
) 

