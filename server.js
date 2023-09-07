const express = require("express")
const dotenv = require("dotenv").config()
const app = express()

const { PORT } = process.env

app.use("/", (req, res) => {
  res.send("Hello World! ")
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
