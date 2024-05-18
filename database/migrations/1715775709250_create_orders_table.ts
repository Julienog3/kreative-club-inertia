import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'orders'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table
        .string('customer_id')
        .references('users.id')
        .onDelete('CASCADE')
        .notNullable()
      table
        .string('seller_id')
        .references('users.id')
        .onDelete('CASCADE')
        .notNullable()
      table.string('step').notNullable()
      table.timestamp('paid_at').nullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}