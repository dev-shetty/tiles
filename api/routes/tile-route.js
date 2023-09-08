const { placeTile } = require("../controllers/tile-controller")
const authenticate = require("../middlewares/authenticate")

const router = require("express").Router()

router.post("/place-tile", authenticate, placeTile)

module.exports = router
