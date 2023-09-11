const router = require("express").Router()
const {
  placeTile,
  getAllTiles,
  getTile,
} = require("../controllers/tile-controller")
const authenticate = require("../middlewares/authenticate")

router.post("/place-tile", authenticate, placeTile)
router.get("/all", authenticate, getAllTiles)
router.get("/", authenticate, getTile)

module.exports = router
