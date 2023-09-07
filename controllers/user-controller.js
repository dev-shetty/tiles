const User = require("../models/user-model")
const { createUserSchema } = require("../lib/schemas")
const { hashPassword } = require("../lib/utils")

// @route - POST /api/v1/user
// @desc - Create a new User
// @access - Public
async function createUser(req, res) {
  try {
    // Validating user response
    createUserSchema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    })

    const isUserRegistered = await User.findOne({ email: req.body.email })
    if (isUserRegistered) {
      return res.status(400).json({
        success: false,
        message: "User already registered please login",
      })
    }

    const hashedPassword = await hashPassword(req.body.password)

    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    })

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Unable to register user. Please try again later!",
      })
    }

    return res.status(200).json({
      success: true,
      message: "User registered successfully!",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      error,
    })
  }
}

module.exports = {
  createUser,
}
