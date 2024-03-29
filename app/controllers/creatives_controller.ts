import type { HttpContext } from '@adonisjs/core/http'

export default class CreativesController {
  public async index({ inertia }: HttpContext) {
    return inertia.render('creatives')
  }

  public async show({ inertia }: HttpContext) {
    return inertia.render('creatives')
  }
}