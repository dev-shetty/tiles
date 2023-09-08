const router = require("express").Router()
const {
  createUser,
  loginUser,
  logoutUser,
} = require("../controllers/user-controller")
const authenticate = require("../middlewares/authenticate")

router.post("/register", createUser)
router.post("/login", loginUser)
router.get("/logout", authenticate, logoutUser)

module.exports = router
