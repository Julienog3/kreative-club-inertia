import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import { randomUUID } from 'crypto'
import User from '#models/user'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Message from '#models/message'

export type Step =  'not-started' | 'in-progress' | 'done'

export default class Order extends BaseModel {
  public static selfAssignPrimaryKey = true
  
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare customerId: string
  
  @belongsTo(() => User, {
    foreignKey: 'customerId'
  })
  declare customer: BelongsTo<typeof User>

  @column()
  declare sellerId: string

  @belongsTo(() => User, {
    foreignKey: 'sellerId'
  })
  declare seller: BelongsTo<typeof User>

  @column()
  declare step: Step

  @column.dateTime()
  declare paidAt?: DateTime

  @hasMany(() => Message)
  declare messages: HasMany<typeof Message>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  public static async createUUID(order: Order) {
    order.id = randomUUID()
  }
}