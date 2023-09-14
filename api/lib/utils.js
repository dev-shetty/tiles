const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

function generateToken(user) {
  return jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  })
}

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

module.exports = {
  hashPassword,
  generateToken,
  generateRandomNumber,
}
