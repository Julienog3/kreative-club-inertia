import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'order_files'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id')
      table
        .uuid('order_id')
        .references('orders.id')
        .onDelete('CASCADE')
      table.string('file')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}