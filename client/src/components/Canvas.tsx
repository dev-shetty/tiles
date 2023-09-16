"use client"

import useSocket from "@/hooks/useSocket"
import { useEffect, useRef, useState } from "react"
import { AiOutlineLoading3Quarters } from "react-icons/ai"

interface CanvasProps {
  color: string
}

interface Tile {
  x: number
  y: number
  color: string
}

export default function Canvas({ color }: CanvasProps) {
  const socket = useSocket()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [loading, setLoading] = useState(false)

  const ROWS = 25
  const CANVAS_SIZE = 720
  const [pixelSize, setPixelSize] = useState(CANVAS_SIZE / ROWS)

  // Keeping track of all the colored tiles
  const [coloredTiles, setColoredTiles] = useState<Tile[]>([])

  async function placeTile(x: number, y: number) {
    const token = sessionStorage.getItem("access_token")
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/tile/place-tile`,
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

    if (data.success) {
      socket?.emit("PLACE_TILE", { x, y, color })
    }
  }

  async function getAllTiles() {
    const token = sessionStorage.getItem("access_token")
    setLoading(true)
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/tile/all`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
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
    setLoading(false)
  }

  async function createPixel(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    clr?: string
  ) {
    ctx.fillStyle = clr ?? color
    ctx.fillRect(pixelSize * x, pixelSize * y, pixelSize, pixelSize)
  }

  function onTileClick(event: MouseEvent, canvas: HTMLCanvasElement) {
    const rect = canvas.getBoundingClientRect()

    const _x = event.clientX - rect.left
    const _y = event.clientY - rect.top

    const box_x = Math.floor(_x / pixelSize)
    const box_y = Math.floor(_y / pixelSize)

    placeTile(box_x, box_y)
  }

  useEffect(() => {
    getAllTiles()

    socket?.on("PLACE_TILE", (tile: Tile) => {
      setColoredTiles((prev) => [...prev, tile])
      console.log(tile)
    })

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    if (CANVAS_SIZE !== rect.width) {
      setPixelSize(rect.width / ROWS)
    }
  }, [socket])

  useEffect(() => {
    const canvas = canvasRef.current

    if (!canvas) return

    const handleCanvasClick = async (event: MouseEvent) => {
      onTileClick(event, canvas)
    }

    canvas.addEventListener("click", handleCanvasClick)
    return () => {
      canvas.removeEventListener("click", handleCanvasClick)
    }
  }, [color, socket])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")

    if (!ctx || !canvas) return

    coloredTiles.forEach((tile) => {
      createPixel(ctx, tile.x, tile.y, tile.color)
    })
  }, [coloredTiles])

  return (
    <div className="relative">
      {loading && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
          <div className="text-2xl flex gap-2 items-center">
            <p>Canvas is Loading</p>
            <AiOutlineLoading3Quarters className="animate-spin" />
          </div>
          <p className="text-center">
            Let&apos;s see what art others have created!
          </p>
        </div>
      )}
      <canvas
        ref={canvasRef}
        height={pixelSize * ROWS}
        width={pixelSize * ROWS}
        className="tile-canvas border-2 cursor-pointer bg-white"
        style={{
          width: "100%",
          maxWidth: CANVAS_SIZE,
        }}
      ></canvas>
    </div>
  )
}
