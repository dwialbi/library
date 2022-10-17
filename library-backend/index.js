const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const db = require("./models")
const loansRoute = require("./routes/loansRoute")
const cartRoute = require("./routes/cartRoute")

dotenv.config()
const PORT = process.env.PORT

const app = express()
app.use(cors())
app.use(express.json())

app.use("/loan", loansRoute)

app.use("/carts", cartRoute)

app.listen(PORT, () => {
  db.sequelize.sync({ alter: true })
  console.log("listening to PORT", PORT)
})
