"use client"

import { useEffect, useRef, useState } from "react"

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const ROWS = 10
  const [color, setColor] = useState("#0ff")

  async function placeTile(x: number, y: number, color: string) {
    const response = await fetch(
      "http://localhost:5000/api/v1/tile/place-tile",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ x, y, color }),
      }
    )

    const data = await response.json()
    console.log(data)

    return data
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")

    if (!ctx || !canvas) return

    const { width } = canvas.getBoundingClientRect()
    const pixelSize = width / ROWS

    canvas?.addEventListener("click", async (event) => {
      const rect = canvas.getBoundingClientRect()

      const _x = event.clientX - rect.left
      const _y = event.clientY - rect.top

      const box_x = Math.floor(_x / pixelSize)
      const box_y = Math.floor(_y / pixelSize)

      const data = await placeTile(box_x, box_y, color)

      if (data.success) {
        ctx.fillStyle = color
        ctx.fillRect(pixelSize * box_x, pixelSize * box_y, pixelSize, pixelSize)
      }
    })

    return () => {
      canvas.removeEventListener("click", () => {})
    }
  }, [])
  return (
    <canvas
      ref={canvasRef}
      width={720}
      height={720}
      className="border"
    ></canvas>
  )
}
