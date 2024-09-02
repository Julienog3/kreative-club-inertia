import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import { randomUUID } from 'crypto'
import Order from '#models/order'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class OrderFile extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare file: string

  @column()
  declare orderId: string

  @belongsTo(() => Order, {
    foreignKey: 'orderId'
  })
  declare order: BelongsTo<typeof Order>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  public static async createUUID(orderFile: OrderFile) {
    orderFile.id = randomUUID()
  }
}