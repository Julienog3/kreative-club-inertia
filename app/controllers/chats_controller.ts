import transmit from '@adonisjs/transmit/services/main'
import type { HttpContext } from '@adonisjs/core/http'
import logger from '@adonisjs/core/services/logger'

export default class ChatsController {
  public async store({ request, response, auth }: HttpContext) {
    const user = await auth.getUserOrFail()
    const { message, username } = request.only(['message', 'username'])

    if (!message || !username) {
      return response.redirect().back()
    }
    transmit.broadcast(`messages/${username}`, { message })
    return response.redirect().back()
  }
}