import { useEffect, useState } from "react"
import socketIOClient, { Socket } from "socket.io-client"

export default function useSocket() {
  const accessToken = sessionStorage.getItem("access_token")
  const socketClient = socketIOClient(`${process.env.NEXT_PUBLIC_SERVER_URL}`, {
    query: {
      access_token: accessToken ? accessToken : "",
    },
  })

  socketClient.on("connect", () => {
    console.log("Connected to Socket.io server")
  })

  return socketClient
}
