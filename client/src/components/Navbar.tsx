"use client"

import Login from "@/components/Login"
import Logout from "@/components/Logout"
import { userContext } from "@/provider/UserProvider"
import Link from "next/link"
import { useContext } from "react"

export default function Navbar() {
  const { user } = useContext(userContext)
  return (
    <nav>
      <div className="absolute w-full flex justify-between px-4 py-4">
        <p>Tiles</p>
        <div>
          {user ? (
            // TODO: Make it button reusable component and extract out the login
            <div className="flex gap-2 items-center">
              <p>{user.name}</p>
              <Logout />
            </div>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 bg-blue-500 rounded-md text-white"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
