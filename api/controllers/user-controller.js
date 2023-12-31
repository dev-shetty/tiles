const bcrypt = require("bcryptjs")
const User = require("../models/user-model")
const { createUserSchema, loginUserSchema } = require("../lib/schemas")
const {
  hashPassword,
  generateToken,
  generateRandomNumber,
} = require("../lib/utils")

// @route - POST /api/v1/user/register
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
    return res.status(500).json({
      success: false,
      error: error,
    })
  }
}

// @route - POST /api/v1/user/login
// @desc - Log in User
// @access - Public

async function loginUser(req, res) {
  try {
    // Validating user response
    loginUserSchema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    })

    const user = await User.findOne({ email: req.body.email })

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User is not registered please register",
      })
    }

    if (await bcrypt.compare(req.body.password, user.password)) {
      const token = generateToken({
        id: user._id,
        name: user.name,
        email: user.email,
      })

      return res.status(200).json({
        success: true,
        message: "User successfully logged in!",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
        access_token: token,
      })
    }

    // If password doesn't match
    return res.status(400).json({
      success: false,
      message: "Invalid Credentials",
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error,
    })
  }
}

// @route - GET /api/v1/user/
// @desc - Get User Details
// @access - Protected
async function getUser(req, res) {
  try {
    const user = req.user
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated!",
      })
    }
    return res.status(200).json({
      success: true,
      user: user,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error,
    })
  }
}

// @route - POST /api/v1/user/guest
// @desc - Login as Guest
// @access - Public
async function loginAsGuest(req, res) {
  try {
    // Generating an 8 digit random number
    const randomNumber = generateRandomNumber(10000000, 99999999)

    const hashedPassword = await hashPassword(randomNumber.toString())

    const user = await User.create({
      name: `Guest${randomNumber}`,
      email: `guest${randomNumber}@tiles.com`,
      password: hashedPassword,
    })

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Unable to register user. Please try again later!",
      })
    }

    const token = generateToken({
      id: user._id,
      name: user.name,
      email: user.email,
    })

    return res.status(200).json({
      success: true,
      message: "User successfully logged in!",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      access_token: token,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error,
    })
  }
}

// @route - DELETE /api/v1/user/:id
// @desc - Get User Details
// @access - Protected
async function deleteUser(req, res) {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not deleted!",
      })
    }
    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error,
    })
  }
}

module.exports = {
  createUser,
  loginUser,
  getUser,
  loginAsGuest,
  deleteUser,
}
