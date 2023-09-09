"use client"

import { FormEvent, useContext, useEffect } from "react"
import socketIOClient from "socket.io-client"
import Link from "next/link"
import { userContext } from "@/provider/UserProvider"
import Canvas from "@/components/Canvas"
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies"

interface HomeProps {
  token: RequestCookie | undefined
}

export default function Home({ token }: HomeProps) {
  const socket = socketIOClient("http://localhost:5000", {
    query: { access_token: token?.value },
  })

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to Socket.io server")
    })

    socket.on("message", (message) => {
      console.log(message)
    })
  }, [])

  function sendMessage(message: string) {
    socket.emit("message", message)
  }

  function placeTile() {
    socket.emit("PLACE_TILE", { x: 0, y: 0, color: "#F0F" })
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
