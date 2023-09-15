"use client"

import { useEffect, useState } from "react"
import socketIOClient, { Socket } from "socket.io-client"
import { useUser } from "@/provider/UserProvider"
import Canvas from "@/components/Canvas"
import ColorPalette from "@/components/ColorPalette"
import WaveDesign from "@/components/assets/WaveDesign"
import Link from "next/link"

export default function Home() {
  const [socket, setSocket] = useState<Socket | null>(null)
  const { user, getUser } = useUser()

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

  async function continueAsGuest() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/user/guest`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    const data = await response.json()
    if (data.success) {
      sessionStorage.setItem("access_token", data.access_token)
      getUser(data.access_token)
    }
  }

  useEffect(() => {
    const accessToken = sessionStorage.getItem("access_token")
    const socketClient = socketIOClient(
      `${process.env.NEXT_PUBLIC_SERVER_URL}`,
      {
        query: {
          access_token: accessToken ? accessToken : "",
        },
      }
    )

    setSocket(socketClient)
    socketClient.on("connect", () => {
      console.log("Connected to Socket.io server")
    })

    return () => {
      socketClient.close()
    }
  }, [])

  return (
    <div>
      {user ? (
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
            <Canvas socket={socket} color={color} />
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="absolute top-0 left-0 w-full -z-10">
            <WaveDesign />
          </div>
          <div className="flex flex-col gap-8 text-center lg:mt-64">
            <p className="text-xl">
              <span className="font-bold">Contribute</span> to the Canvas <br />{" "}
              by Placing a Tile
            </p>
            <div className="flex flex-col gap-4">
              <Link
                href="/register"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-4 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Register
              </Link>
              <div className="flex items-center gap-2">
                <p>Wanna give it a try?</p>
                <button
                  className="flex justify-center rounded-md text-indigo-600 px-4 py-1.5 text-sm font-semibold leading-6 hover:text-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={continueAsGuest}
                >
                  Continue as Guest
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
