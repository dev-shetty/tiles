const router = require("express").Router()
const { placeTile, getAllTiles } = require("../controllers/tile-controller")
const authenticate = require("../middlewares/authenticate")

router.post("/place-tile", authenticate, placeTile)
router.get("/all", authenticate, getAllTiles)

module.exports = router
