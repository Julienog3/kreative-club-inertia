import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'portfolio_folders'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').unique()
      table.string('title').notNullable()
      table.text('description')
      table
        .string('user_id')
        .references('users.id')
        .onDelete('CASCADE')
        .notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}