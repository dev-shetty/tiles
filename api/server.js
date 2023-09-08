const express = require("express")
const dotenv = require("dotenv").config()
const cors = require("cors")
const http = require("http")
const cookieParser = require("cookie-parser")
const { Server } = require("socket.io")

const connectDB = require("./config/db")

const { PORT } = process.env
const app = express()
const httpServer = http.createServer(app)
const io = new Server(httpServer, { cors: { origin: "*" } })

connectDB()

// middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

io.on("connection", (socket) => {
  socket.on("PLACE_TILE", async (data) => {
    try {
      // Add mongo db code here

      console.log(data)

      // Broadcase the tile placement to other users
      io.emit("PLACE_TILE", data)
    } catch (error) {}
  })

  socket.on("message", (message) => {
    console.log(message)
    io.emit("message", "Thanks for the message")
  })

  socket.on("disconnect", () => {
    console.log("A user disconnected")
  })
})

app.get("/", (req, res) => {
  res.send("Hello World! ")
})

app.use("/api/v1/user", require("./routes/user-route"))
app.use("/api/v1/tile", require("./routes/tile-route"))

httpServer.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
