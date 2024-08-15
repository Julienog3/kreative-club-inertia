import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import { randomUUID } from 'node:crypto'
import Order from '#models/order'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from '#models/user'

export default class Message extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare orderId: string
  
  @belongsTo(() => Order)
  declare order: BelongsTo<typeof Order>

  @column()
  declare userId: string
  
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column()
  declare content: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  public static async createUUID(message: Message) {
    message.id = randomUUID()
  }
}