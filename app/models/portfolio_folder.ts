import { BaseModel, beforeCreate, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'
import PortfolioImage from '#models/portfolio_image'
import User from '#models/user'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Category from '#models/category'

export default class PortfolioFolder extends BaseModel {
  static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  declare id: string

  @column()
  title: string

  @column()
  description: string

  @column()
  userId: string

  @belongsTo(() => User)
  user: BelongsTo<typeof User>

  @hasMany(() => PortfolioImage)
  portfolioImages: HasMany<typeof PortfolioImage>

  // @hasMany(() => Category)
  // public categories: HasMany<typeof Category>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  updatedAt: DateTime

  @beforeCreate()
  protected static async createUUID(portfolioFolder: PortfolioFolder) {
    portfolioFolder.id = randomUUID()
  }
}
