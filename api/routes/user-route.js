const router = require("express").Router()
const {
  createUser,
  loginUser,
  getUser,
  loginAsGuest,
  deleteUser,
} = require("../controllers/user-controller")
const authenticate = require("../middlewares/authenticate")

router.post("/register", createUser)
router.post("/login", loginUser)
router.get("/", authenticate, getUser)
router.post("/guest", loginAsGuest)
router.delete("/:id", authenticate, deleteUser)

module.exports = router
