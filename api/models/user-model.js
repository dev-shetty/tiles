const mongoose = require("mongoose")

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name field is required"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email field is required"],
    },
    password: {
      type: String,
      required: [true, "Password field is required"],
    },
    isUserOnCooldown: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
)

module.exports = mongoose.model("User", userSchema)
