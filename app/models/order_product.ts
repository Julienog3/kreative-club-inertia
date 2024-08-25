import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import { randomUUID } from 'crypto'
import Order from '#models/order'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class OrderProduct extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare orderId: string

  @belongsTo(() => Order, {
    foreignKey: 'orderId'
  })
  declare order: BelongsTo<typeof Order>

  @column()
  declare name: string

  @column()
  declare price: number

  @column()
  declare quantity: number

  @column()
  declare duration: number

  @column()
  declare details?: string 

  @beforeCreate()
  public static async createUUID(orderProduct: OrderProduct) {
    orderProduct.id = randomUUID()
  }
}