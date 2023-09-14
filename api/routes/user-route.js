const router = require("express").Router()
const {
  createUser,
  loginUser,
  getUser,
  loginAsGuest,
} = require("../controllers/user-controller")
const authenticate = require("../middlewares/authenticate")

router.post("/register", createUser)
router.post("/login", loginUser)
router.get("/", authenticate, getUser)
router.post("/guest", loginAsGuest)

module.exports = router
