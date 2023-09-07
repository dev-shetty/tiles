const express = require("express")
const dotenv = require("dotenv").config()
const cors = require("cors")
const app = express()
const connectDB = require("./config/db")

const { PORT } = process.env
connectDB()

// middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get("/", (req, res) => {
  res.send("Hello World! ")
})

app.use("/api/v1/user", require("./routes/user-route"))

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
