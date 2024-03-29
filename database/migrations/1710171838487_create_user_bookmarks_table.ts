import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_bookmarks'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .string('user_id')
        .references('users.id')
        .onDelete('CASCADE')
        .notNullable()
      table
        .string('creative_id')
        .references('users.id')
        .onDelete('CASCADE')
        .notNullable()
      table.unique(['user_id', 'creative_id'])
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}