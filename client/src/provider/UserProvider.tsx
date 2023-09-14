"use client"

import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react"
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
  setUser: Dispatch<SetStateAction<User | null>>
  getUser: (access_token?: string) => Promise<void>
}

const userContext = createContext<UserContextProps | null>(null)

export default function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null)

  async function getUser(access_token?: string) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/user`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    )
    const data = await response.json()

    if (data.success) setUser(data.user)
    if (data.error) setUser(null)
  }

  useEffect(() => {
    const token = sessionStorage.getItem("access_token")
    getUser(token!)
  }, [])

  return (
    <userContext.Provider value={{ user, setUser, getUser }}>
      {children}
    </userContext.Provider>
  )
}

export function useUser() {
  const context = useContext(userContext)

  if (!context) {
    throw new Error("useUser must be used within a UserProvider")
  }

  return context
}
