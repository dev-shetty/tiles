const express = require("express")
const dotenv = require("dotenv").config()
const cors = require("cors")
const http = require("http")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const { Server } = require("socket.io")

const connectDB = require("./config/db")
const User = require("./models/user-model")

const { PORT } = process.env
const app = express()
const httpServer = http.createServer(app)
const io = new Server(httpServer, { cors: { origin: "*" } })

connectDB()

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, // Allow credentials (cookies)
}

// middlewares
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

io.use(async (socket, next) => {
  try {
    const { access_token } = socket.handshake.query
    if (access_token) {
      const decodedToken = jwt.verify(access_token, process.env.JWT_SECRET)
      const user = await User.findById(decodedToken.user.id).select("-password")

      if (user) {
        socket.userId = user._id
        return next()
      }
    } else {
      return next(new Error("Authentication error"))
    }
  } catch (error) {
    console.log("JWT verification error:", error.message)
  }
}).on("connection", (socket) => {
  console.log("User connected")

  socket.on("PLACE_TILE", (tile) => {
    io.emit("PLACE_TILE", tile)
  })

  socket.on("disconnect", () => {
    console.log("User disconnected")
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
