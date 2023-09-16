"use client"

import Canvas from "@/components/Canvas"
import ColorPalette from "@/components/ColorPalette"
import { useState } from "react"

export default function page() {
  const colorsList = [
    "#FF5733",
    "#FFC300",
    "#33FF57",
    "#3357FF",
    "#FF33EC",
    "#FF33A1",
    "#33FFEC",
    "#33A1FF",
  ]
  const [color, setColor] = useState(colorsList[0])
  return (
    <div className="pt-20 overflow-auto">
      <h1 className="text-xl lg:text-3xl mb-4 text-center font-bold">
        Place a tile make a{" "}
        <span className="bg-gradient-to-tr from-[#FFC300] to-[#FF5733] bg-clip-text text-transparent">
          contribution
        </span>{" "}
        to the Canvas
      </h1>
      <div className="flex flex-col lg:flex-row gap-2">
        <ColorPalette
          setColor={setColor}
          colorsList={colorsList}
          color={color}
        />
        <Canvas color={color} />
      </div>
    </div>
  )
}
