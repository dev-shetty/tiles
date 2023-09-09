"use client"

import { useEffect, useState } from "react"
import { createContext } from "react"

interface UserProviderProps {
  children: React.ReactNode
}

interface User {
  _id: string
  name: string
  email: string
  isUserOnCountdown: boolean
  createdAt: string
  updatedAt: string
  __v: number
}

interface UserContextProps {
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  getUser: (access_token?: string) => Promise<void>
}

export const userContext = createContext<Partial<UserContextProps>>({})

export default function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const token = sessionStorage.getItem("access_token")

  async function getUser(access_token?: string) {
    const response = await fetch("http://localhost:5000/api/v1/user", {
      headers: {
        Authorization: `Bearer ${access_token ?? token}`,
      },
    })
    const data = await response.json()

    if (data.success) setUser(data.user)
    if (data.error) setUser(null)
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <userContext.Provider value={{ user, setUser, getUser }}>
      {children}
    </userContext.Provider>
  )
}
