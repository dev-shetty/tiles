const router = require("express").Router()
const { createUser } = require("../controllers/user-controller")

router.post("/", createUser)

module.exports = router
