import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column, computed, hasMany } from '@adonisjs/lucid/orm'
import { randomUUID } from 'crypto'
import User from '#models/user'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Message from '#models/message'
import OrderProduct from '#models/order_product'
import OrderStep from '#models/order_step'
import OrderFile from '#models/order_file'
import Review from '#models/review'

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
  declare step: string

  @column.dateTime()
  declare paidAt?: DateTime

  @hasMany(() => OrderProduct)
  declare products: HasMany<typeof OrderProduct>

  @hasMany(() => OrderStep)
  declare steps: HasMany<typeof OrderStep>

  @hasMany(() => Message)
  declare messages: HasMany<typeof Message>

  @hasMany(() => OrderFile)
  declare files: HasMany<typeof OrderFile>

  @hasMany(() => Review)
  declare reviews: HasMany<typeof Review> 

  @computed()
  get latestMessage() {
    if (!this.messages) return ""

    return this.messages.reduce((acc, curr) => {
      return curr.createdAt > acc.createdAt ? curr : acc;
    }, this.messages[0])
  }

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  public static async createUUID(order: Order) {
    order.id = randomUUID()
  }
}