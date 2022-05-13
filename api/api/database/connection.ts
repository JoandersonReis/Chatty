import knex from "knex"
import "dotenv/config"

const db = knex({
  client: "pg",
  connection: process.env.PG_URL,
  searchPath: ['knex', 'public'],
  useNullAsDefault: true
})

export default db