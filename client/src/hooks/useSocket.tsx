import { useEffect, useState } from "react"
import socketIOClient, { Socket } from "socket.io-client"

export default function useSocket() {
  const [socket, setSocket] = useState<Socket | null>(null)

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
  }, [])

  return socket
}
