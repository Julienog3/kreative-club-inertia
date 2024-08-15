import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'messages'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id')
      table
        .uuid('order_id')
        .references('orders.id')
        .onDelete('CASCADE')
        .notNullable()
      table
        .string('user_id')
        .references('users.id')
        .onDelete('CASCADE')
        .notNullable()
      table.text('content').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}