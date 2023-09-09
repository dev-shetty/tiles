const jwt = require("jsonwebtoken")
const User = require("../models/user-model")

async function authenticate(req, res, next) {
  const tokenHeader = req.header("Authorization")

  if (!tokenHeader || !tokenHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message:
        "Please include a valid Bearer token in the Authorization header",
    })
  }

  token = tokenHeader.split(" ")[1]
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Please log in to continue",
    })
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decodedToken.user.id).select("-password")

    req.user = user

    next()
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid Request / Token is not valid",
    })
  }
}

module.exports = authenticate
