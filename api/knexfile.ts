import path from "path"
import "dotenv/config"

module.exports = {
  client: "pg",
  connection: process.env.PG_URL,
  migrations: {
    directory: path.resolve(__dirname, "api", "database", "migrations")
  },
  seeds: {
    directory: path.resolve(__dirname, "api", "database", "seeds")
  },
  useNullAsDefault: true,
}