const router = require("express").Router()
const { placeTile } = require("../controllers/tile-controller")
const authenticate = require("../middlewares/authenticate")

router.post("/place-tile", authenticate, placeTile)

module.exports = router
