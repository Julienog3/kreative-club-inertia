import { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'
import { BaseModel, beforeCreate, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from '#models/user'

export default class PortfolioImage extends BaseModel {
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare title: string

  @column()
  declare image: string
  
  @column()
  declare userId: string
  
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column()
  declare portfolioFolderId: string

  @belongsTo(() => User)
  declare portfolioFolder: BelongsTo<typeof User>

  @column()
  declare isIllustration: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  protected static async createUUID(portfolioImage: PortfolioImage) {
    portfolioImage.id = randomUUID()
  } 
}
