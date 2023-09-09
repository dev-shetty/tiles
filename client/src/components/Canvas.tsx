"use client"

import { useEffect, useRef, useState } from "react"
import { Socket } from "socket.io-client"

interface CanvasProps {
  socket: Socket | null
}

interface Tile {
  x: number
  y: number
  color: string
}

export default function Canvas({ socket }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const ROWS = 10
  const [color, setColor] = useState("#0ff")

  // Keeping track of all the colored tiles
  const [coloredTiles, setColoredTiles] = useState<Tile[]>([])
  const token = sessionStorage.getItem("access_token")

  async function placeTile(x: number, y: number, color: string) {
    const response = await fetch(
      "http://localhost:5000/api/v1/tile/place-tile",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ x, y, color }),
      }
    )

    const data = await response.json()

    return data
  }

  async function getAllTiles() {
    const response = await fetch("http://localhost:5000/api/v1/tile/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await response.json()

    const _tiles: Tile[] = []

    data.tiles.map((tile: any) => {
      const _tile = {
        color: tile.color,
        x: tile.x,
        y: tile.y,
      }

      _tiles.push(_tile)
    })

    setColoredTiles(_tiles)
  }

  function createPixel(
    ctx: CanvasRenderingContext2D,
    pixelSize: number,
    x: number,
    y: number,
    color: string
  ) {
    ctx.fillStyle = color
    ctx.fillRect(pixelSize * x, pixelSize * y, pixelSize, pixelSize)
  }

  async function onTileClick(
    event: MouseEvent,
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    pixelSize: number
  ) {
    const rect = canvas.getBoundingClientRect()

    const _x = event.clientX - rect.left
    const _y = event.clientY - rect.top

    const box_x = Math.floor(_x / pixelSize)
    const box_y = Math.floor(_y / pixelSize)

    const data = await placeTile(box_x, box_y, color)

    if (data.success) {
      createPixel(ctx, pixelSize, box_x, box_y, color)
      socket?.emit("PLACE_TILE", { x: box_x, y: box_y, color })
    }
  }

  useEffect(() => {
    getAllTiles()

    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")

    if (!ctx || !canvas) return

    const { width } = canvas.getBoundingClientRect()
    const pixelSize = width / ROWS

    canvas.addEventListener("click", async (event) =>
      onTileClick(event, canvas, ctx, pixelSize)
    )

    socket?.on("PLACE_TILE", (tile: Tile) => {
      setColoredTiles((prevTiles) => [...prevTiles, tile])
    })

    return () => {
      canvas.removeEventListener("click", (event) =>
        onTileClick(event, canvas, ctx, pixelSize)
      )
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")

    if (!ctx || !canvas) return
    const { width } = canvas.getBoundingClientRect()
    const pixelSize = width / ROWS

    coloredTiles.forEach((tile) => {
      createPixel(ctx, pixelSize, tile.x, tile.y, tile.color)
    })
  }, [coloredTiles])

  return (
    <canvas
      ref={canvasRef}
      width={720}
      height={720}
      className="border"
    ></canvas>
  )
}
