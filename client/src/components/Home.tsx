"use client"

import { useEffect, useState } from "react"
import socketIOClient, { Socket } from "socket.io-client"
import { useUser } from "@/provider/UserProvider"
import Canvas from "@/components/Canvas"
import ColorPalette from "@/components/ColorPalette"

export default function Home() {
  const [socket, setSocket] = useState<Socket | null>(null)

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

  useEffect(() => {
    const accessToken = sessionStorage.getItem("access_token")
    const socketClient = socketIOClient("http://localhost:5000", {
      query: {
        access_token: accessToken ? accessToken : "",
      },
    })

    setSocket(socketClient)
    socketClient.on("connect", () => {
      console.log("Connected to Socket.io server")
    })

    socketClient.on("message", (message) => {
      console.log(message)
    })

    return () => {
      socketClient.close()
    }
  }, [])

  const { user } = useUser()

  return (
    <div>
      {user ? (
        <div>
          <Canvas socket={socket} color={color} />
          <ColorPalette setColor={setColor} colorsList={colorsList} />
        </div>
      ) : (
        <p>Login to Continue</p>
      )}
    </div>
  )
}
