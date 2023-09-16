"use client"

import { useEffect, useState } from "react"
import { useUser } from "@/provider/UserProvider"
import WaveDesign from "@/components/assets/WaveDesign"
import Link from "next/link"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { useRouter } from "next/navigation"

export default function Home() {
  const [loading, setLoading] = useState(false)
  const { user, getUser } = useUser()
  const router = useRouter()

  async function continueAsGuest() {
    setLoading(true)
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/user/guest`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    const data = await response.json()
    if (data.success) {
      sessionStorage.setItem("access_token", data.access_token)
      getUser(data.access_token)
      setLoading(false)
      router.push("/canvas")
    }
  }

  return (
    <div>
      <div className="flex justify-center">
        <div className="absolute top-0 left-0 w-full -z-10">
          <WaveDesign />
        </div>
        <div className="flex flex-col gap-8 text-center lg:mt-64">
          <p className="text-xl">
            <span className="font-bold">Contribute</span> to the Canvas <br />{" "}
            by Placing a Tile
          </p>
          {user ? (
            <div className="flex flex-col gap-2">
              <p>What are you doing here?</p>
              <button
                className="flex w-full justify-center rounded-md bg-indigo-600 px-4 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={continueAsGuest}
                disabled={loading}
              >
                Go to Canvas
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <Link
                href="/register"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-4 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Register
              </Link>
              <div className="flex items-center gap-2">
                <p>Wanna give it a try?</p>
                <button
                  className="flex justify-center rounded-md text-indigo-600 px-4 py-1.5 text-sm font-semibold leading-6 hover:text-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={continueAsGuest}
                  disabled={loading}
                >
                  {loading ? (
                    <p className="flex items-center gap-1">
                      Hang tight!
                      <span>
                        <AiOutlineLoading3Quarters className="animate-spin" />{" "}
                      </span>
                    </p>
                  ) : (
                    <p>Continue as Guest</p>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
