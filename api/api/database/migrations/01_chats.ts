import { Knex } from "knex"


export async function up(knex: Knex) {
  return knex.schema.createTable("chats", (table) => {
    table.increments("id").primary()
    table.timestamp("created_at").defaultTo(knex.raw("CURRENT_TIMESTAMP")).notNullable()

    table.integer("user_one_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE")

    table.integer("user_two_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE")
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("chats")
}
