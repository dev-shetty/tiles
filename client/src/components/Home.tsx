"use client"

import { FormEvent, useEffect, useState } from "react"
import socketIOClient from "socket.io-client"

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

  return (
    <div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          name="message"
          className="border border-gray-400 rounded-lg p-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Submit
        </button>
      </form>
    </div>
  )
}
