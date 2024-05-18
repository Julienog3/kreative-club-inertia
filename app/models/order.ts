import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, hasOne } from '@adonisjs/lucid/orm'
import { randomUUID } from 'crypto'
import User from '#models/user'
import type { HasOne } from '@adonisjs/lucid/types/relations'

export enum Step {
  NotStarted = 'not-started',
  InProgress = 'in-progress',
  Done = 'done',

}

export default class Order extends BaseModel {
  public static selfAssignPrimaryKey = true
  
  @column({ isPrimary: true })
  declare id: string

  @hasOne(() => User)
  declare customer: HasOne<typeof User>

  @hasOne(() => User)
  declare seller: HasOne<typeof User>

  @column()
  declare step: Step

  @column.dateTime()
  declare paidAt: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  public static async createUUID(order: Order) {
    order.id = randomUUID()
  }
}