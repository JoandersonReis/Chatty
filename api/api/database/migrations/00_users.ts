import { Knex } from "knex"


export async function up(knex: Knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary()
    table.string("name").notNullable()
    table.string("avatar").defaultTo(null)
    table.string("cellnumber").notNullable()
    table.string("gender").notNullable()
    table.string("password").notNullable()
    table.string("bio").defaultTo(null)
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("users")
}
