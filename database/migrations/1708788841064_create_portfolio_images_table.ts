import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
  protected tableName = 'portfolio_images'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').unique()
      table.string('title').notNullable()
      table.string('image').notNullable()
      table.boolean('is_illustration').notNullable().defaultTo(false)
      table
        .string('user_id')
        .references('users.id')
        .onDelete('CASCADE')
        .notNullable()
      table
        .string('portfolio_folder_id')
        .references('portfolio_folders.id')
        .onDelete('CASCADE')
        .nullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
