"use client"

import { FormEvent, useContext, useEffect } from "react"
import socketIOClient from "socket.io-client"
import Link from "next/link"
import { userContext } from "@/provider/UserProvider"

export default function Home() {
  const socket = socketIOClient("http://localhost:5000")

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to Socket.io server")
    })

    socket.on("message", (message) => {
      console.log(message)
    })
  }, [])

  function sendMessage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const message = formData.get("message")

    socket.emit("message", message)
  }

  function placeTile() {
    socket.emit("PLACE_TILE", { x: 0, y: 0, color: "#F0F" })
  }

  const { user } = useContext(userContext)

  return (
    <div>
      <Link href="/register">
        <button
          onClick={placeTile}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Register
        </button>
      </Link>
      {user ? "User Logged in" : "User Not logged in"}
    </div>
  )
}
