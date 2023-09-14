"use client"

import Logout from "@/components/Logout"
import { useUser } from "@/provider/UserProvider"
import Link from "next/link"

export default function Navbar() {
  const { user } = useUser()
  return (
    <nav>
      <div className="absolute w-full flex justify-between items-center px-4 py-4">
        <Link href="/" className="text-xl font-bold tracking-wider">
          Tiles
        </Link>
        <div>
          {user ? (
            <div className="flex gap-2 items-center">
              <p>{user.name}</p>
              <Logout />
            </div>
          ) : (
            <Link
              href="/login"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-4 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
