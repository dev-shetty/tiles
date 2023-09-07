const router = require("express").Router()
const { createUser, loginUser } = require("../controllers/user-controller")
const authenticate = require("../middlewares/authenticate")

router.post("/register", createUser)
router.post("/login", loginUser)

module.exports = router
