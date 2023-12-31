"use client"

import Logout from "@/components/Logout"
import { useUser } from "@/provider/UserProvider"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { SiGithub } from "react-icons/si"

export default function Navbar() {
  const { user } = useUser()
  const pathName = usePathname()
  return (
    <nav>
      <div className="absolute w-full flex justify-between items-center px-4 py-4">
        {pathName !== "/" && (
          <Link href="/" className="text-xl font-bold tracking-wider">
            Tiles
          </Link>
        )}
        <div className="ml-auto items-center flex gap-2">
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
          <Link href="https://github.com/Deveesh-Shetty/tiles" target="_blank">
            <SiGithub className="text-2xl" />
          </Link>
        </div>
      </div>
    </nav>
  )
}
