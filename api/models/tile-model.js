const mongoose = require("mongoose")

const tileSchema = mongoose.Schema({
  x: {
    type: Number,
    required: [true, "x-coordinate is required"],
  },
  y: {
    type: Number,
    required: [true, "y-coordinate is required"],
  },
  color: {
    type: String,
    default: "#000000",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
})

module.exports = mongoose.model("Tile", tileSchema)
