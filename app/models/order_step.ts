import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { randomUUID } from 'crypto'
import Order from '#models/order'

export type Step =  'pending' | 'quote-created' | 'quote-validated' | 'not-started' | 'in-progress' | 'done'
export default class OrderStep extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare orderId: string

  @belongsTo(() => Order, {
    foreignKey: 'orderId'
  })
  declare order: BelongsTo<typeof Order>

  @column()
  declare name: Step

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @beforeCreate()
  public static async createUUID(orderStep: OrderStep) {
    orderStep.id = randomUUID()
  }
}