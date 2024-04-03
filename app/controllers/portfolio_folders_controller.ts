// import type { HttpContext } from '@adonisjs/core/http'

import PortfolioFolder from "#models/portfolio_folder"
import { createPortfolioFolderValidator } from "#validators/portfolio_folder"
import { HttpContext } from "@adonisjs/core/http"

export default class PortfolioFoldersController {
  public async index({ params }: HttpContext) {
    return await PortfolioFolder.query().where('userId', params.userId).preload('portfolioImages')
  }

  public async store({ auth, request, response }: HttpContext): Promise<void> {
    const user = await auth.getUserOrFail()

    const payload = await request.validateUsing(createPortfolioFolderValidator)

    const portfolioFolder = await user.related('portfolioFolders').create(payload)
    return response.redirect().toPath(`/preferences/portfolio/folders/${portfolioFolder.id}`)
  }

  public async destroy({ params, response }: HttpContext): Promise<void> {
    const portfolioFolder = await PortfolioFolder.findOrFail(params.portfolioFolderId)
    await portfolioFolder.delete()
    return response.redirect().toRoute('preferences.portfolio')

  }
}
