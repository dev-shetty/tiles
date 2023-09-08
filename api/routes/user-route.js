const router = require("express").Router()
const {
  createUser,
  loginUser,
  logoutUser,
  getUser,
} = require("../controllers/user-controller")
const authenticate = require("../middlewares/authenticate")

router.post("/register", createUser)
router.post("/login", loginUser)
router.get("/logout", authenticate, logoutUser)
router.get("/", authenticate, getUser)

module.exports = router
