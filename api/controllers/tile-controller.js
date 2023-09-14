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

    const isTilePresent = await Tile.findOne({ x: req.body.x, y: req.body.y })
    if (isTilePresent) {
      // Update the tile with new user and color
      const updatedTile = await Tile.findOneAndUpdate(
        { x: req.body.x, y: req.body.y },
        { color: req.body.color, user: req.user._id },
        { new: true }
      )

      if (!updatedTile) {
        return res.status(400).json({
          success: false,
          message: "Unable to place tile. Please try again later!",
        })
      }

      return res.status(200).json({
        success: true,
        message: "Tile placed successfully!",
        tile: {
          id: updatedTile._id,
          color: updatedTile.color,
          user: updatedTile.user,
        },
      })
    }

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

// @route - GET /api/v1/tile/all
// @desc - Get all the tiles
// @access - Private

async function getAllTiles(req, res) {
  try {
    const tiles = await Tile.find()
    if (!tiles) {
      return res.status(400).json({
        success: false,
        message: "Unable to get tiles. Please try again later!",
      })
    }

    return res.status(200).json({
      success: true,
      tiles,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error,
    })
  }
}

// @route - GET /api/v1/tile?x=&y=
// @desc - Get a tile by ID
// @access - Private
async function getTile(req, res) {
  try {
    const { x, y } = req.query
    const tile = await Tile.findOne({ x, y })
    if (!tile) {
      return res.status(400).json({
        success: false,
        message: "Tile not placed yet!",
      })
    }

    return res.status(200).json({
      success: true,
      tile,
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
  getAllTiles,
  getTile,
}
