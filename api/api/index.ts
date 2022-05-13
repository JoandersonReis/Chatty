import express from "express"
import router from "./routes"
import "dotenv/config"

const app = express()
app.use(express.json())
app.use(router)


const port = 4000
app.listen(port, () => {
  console.log(`Chatty API is running in port ${port}!! 🚀 `)
})