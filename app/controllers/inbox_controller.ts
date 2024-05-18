import type { HttpContext } from '@adonisjs/core/http'

export default class InboxController {
  public async index({ inertia }: HttpContext) {
    return await inertia.render('inbox')
  }
}