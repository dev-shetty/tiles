const { tileSchema } = require("../lib/schemas")
const Tile = require("../models/tile-model")

// @route - POST /api/v1/tile/place-tile
// @desc - Place a tile
// @access - Private
async function placeTile(req, res) {
  try {
    tileSchema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    })

    const tile = await Tile.create({
      x: req.body.x,
      y: req.body.y,
      color: req.body.color,
      user: req.user._id,
    })

    if (!tile) {
      return res.status(400).json({
        success: false,
        message: "Unable to place tile. Please try again later!",
      })
    }

    return res.status(200).json({
      success: true,
      message: "Tile placed successfully!",
      tile: {
        id: tile._id,
        color: tile.color,
        user: tile.user,
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error,
    })
  }
}

module.exports = {
  placeTile,
}
