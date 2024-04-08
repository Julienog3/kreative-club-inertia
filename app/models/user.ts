import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import hash from '@adonisjs/core/services/hash'
import { randomUUID } from 'node:crypto'
import { compose } from '@adonisjs/core/helpers'
import { withAuthFinder } from '@adonisjs/auth'
import {  DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import Category from '#models/category'
import PortfolioImage from '#models/portfolio_image'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import PortfolioFolder from '#models/portfolio_folder'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export enum Role {
  Admin = 'admin',
  User = 'user',
}

export default class User extends compose(BaseModel, AuthFinder) {
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare role: Role

  @column()
  declare username: string

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare firstName: string | null

  @column()
  declare lastName: string | null

  @column()
  declare phoneNumber: string | null

  @column()
  declare avatar: string | null

  @column()
  declare portfolioEnabled: boolean

  @column()
  declare description: string | null

  @manyToMany(() => Category, {
    pivotTable: 'user_categories'
  })
  declare categories: ManyToMany<typeof Category>

  @manyToMany(() => User, {
    localKey: 'id',
    pivotForeignKey: 'user_id',
    pivotTable: 'user_bookmarks',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'creative_id',
  })
  declare bookmarks: ManyToMany<typeof User>

  @hasMany(() => PortfolioImage)
  declare portfolioImages: HasMany<typeof PortfolioImage>

  @hasMany(() => PortfolioFolder)
  declare portfolioFolders: HasMany<typeof PortfolioFolder>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  static accessTokens = DbAccessTokensProvider.forModel(User)

  @beforeCreate()
  public static async createUUID(user: User) {
    user.id = randomUUID()
  }
}
