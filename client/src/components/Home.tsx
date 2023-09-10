"use client"

import { useContext, useEffect, useState } from "react"
import socketIOClient, { Socket } from "socket.io-client"
import { useUser } from "@/provider/UserProvider"
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

  const { user } = useUser()

  return (
    <div>
      {user ? (
        <div>
          <Canvas socket={socket} />
        </div>
      ) : (
        <p>Login to Continue</p>
      )}
    </div>
  )
}
