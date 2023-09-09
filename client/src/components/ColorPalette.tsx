import { Dispatch, SetStateAction } from "react"

interface ColorPaletteProps {
  color: string
  setColor: Dispatch<SetStateAction<string>>
  colorsList: string[]
}

export default function ColorPalette({
  color,
  setColor,
  colorsList,
}: ColorPaletteProps) {
  return (
    <div className="absolute left-2 md:left-16 top-1/2 -translate-y-1/2">
      <ul className="flex flex-col ">
        {colorsList.map((clr) => (
          <li
            key={clr}
            onClick={() => setColor(clr)}
            style={{ backgroundColor: clr }}
            className={`cursor-pointer w-16 aspect-square`}
          ></li>
        ))}
      </ul>
    </div>
  )
}
