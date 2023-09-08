const mongoose = require("mongoose")

async function connectDB() {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI)
    console.log("MongoDB Connected!")
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = connectDB
