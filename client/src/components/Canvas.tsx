"use client"

import { useEffect, useRef, useState } from "react"

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const ROWS = 10

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")

    if (!ctx || !canvas) return

    const { width } = canvas.getBoundingClientRect()
    const pixelSize = width / ROWS

    canvas?.addEventListener("click", (event) => {
      const rect = canvas.getBoundingClientRect()

      const _x = event.clientX - rect.left
      const _y = event.clientY - rect.top

      const box_x = Math.floor(_x / pixelSize)
      const box_y = Math.floor(_y / pixelSize)

      ctx.fillStyle = "#0ff"
      ctx.fillRect(pixelSize * box_x, pixelSize * box_y, pixelSize, pixelSize)
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
