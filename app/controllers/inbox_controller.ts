import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class InboxController {
  public async index({ auth, inertia }: HttpContext) {
    const user = await auth.getUserOrFail()
    const purchases = await user.related('purchases').query().preload('customer').preload('seller')
    const sales = await user.related('sales').query().preload('customer').preload('seller')

    return await inertia.render('messages/list', { purchases, sales })
  }

  public async show({ auth, inertia, params }: HttpContext) {
    const user = await auth.getUserOrFail()
    const recipient = await User.findByOrFail('username', params.recipientId)

    const purchases = await user.related('purchases').query().preload('customer').preload('seller')
    const sales = await user.related('sales').query().preload('customer').preload('seller')

    return await inertia.render('messages/single', { purchases, sales, recipient })
  }
}