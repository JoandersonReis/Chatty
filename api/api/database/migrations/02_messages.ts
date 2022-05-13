import { Knex } from "knex"


export async function up(knex: Knex) {
  return knex.schema.createTable("messages", (table) => {
    table.increments("id").primary()
    table.string("message").notNullable()
    table.string("status").defaultTo("sended")
    table.timestamp("created_at").defaultTo(knex.raw("CURRENT_TIMESTAMP")).notNullable()

    table.integer("chat_id")
      .references("id")
      .inTable("chats")
      .onDelete("CASCADE")
      .onUpdate("CASCADE")

    table.integer("owner_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE")

    table.integer("receiver_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE")
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("messages")
}
