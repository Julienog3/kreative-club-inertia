import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import Order from '#models/order'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Category from '#models/category'

export enum OrderDelay {
  Asap = 'asap',
  InTheMonth = 'in-the-month',
  Free = 'free'
}

export default class OrderRequest extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare orderId: string

  @belongsTo(() => Order, {
    foreignKey: 'orderId'
  })
  declare order: BelongsTo<typeof Order>

  @column()
  declare type: string

  @manyToMany(() => Category, {
    pivotTable: 'order_request_categories'
  })
  declare categories: ManyToMany<typeof Category>

  @column()
  declare delay: OrderDelay

  @column()
  declare description: string
}