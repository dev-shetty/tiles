"use client"

import { useContext, useEffect, useState } from "react"
import socketIOClient, { Socket } from "socket.io-client"
import { userContext } from "@/provider/UserProvider"
import Canvas from "@/components/Canvas"

export default function Home() {
  const accessToken = sessionStorage.getItem("access_token")
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
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

  function sendMessage(message: string) {
    socket?.emit("message", message)
  }

  function placeTile() {
    socket?.emit("PLACE_TILE", { x: 0, y: 0, color: "#F0F" })
  }

  const { user } = useContext(userContext)

  return (
    <div>
      {user ? (
        <div>
          <Canvas />
          <button
            onClick={() => sendMessage("Hello from Client, this is Deveesh")}
          >
            Send a message!
          </button>
        </div>
      ) : (
        <p>Login to Continue</p>
      )}
    </div>
  )
}
