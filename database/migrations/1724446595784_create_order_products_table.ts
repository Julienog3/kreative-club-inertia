import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'order_products'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table
        .uuid('order_id')
        .references('orders.id')
        .onDelete('CASCADE')
      table.string('name')
      table.float('price')
      table.integer('quantity')
      table.integer('duration')
      table.text('details').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}