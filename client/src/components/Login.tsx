"use client"

import { useUser } from "@/provider/UserProvider"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { AiOutlineLoading3Quarters } from "react-icons/ai"

export default function Login() {
  const router = useRouter()
  const { getUser } = useUser()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function loginUser(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const details = {
      email: formData.get("email"),
      password: formData.get("password"),
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/user/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
      }
    )

    const data = await response.json()

    if (data.success) {
      sessionStorage.setItem("access_token", data.access_token)
      getUser!(data.access_token)
      router.push("/canvas")
    } else {
      if (data.message !== null) {
        setError(data.message)
      } else {
        setError("Something went wrong")
      }
    }

    setLoading(false)
  }
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-4" onSubmit={loginUser} method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {error !== null ? (
              <p className="text-red-500 text-center">{error}</p>
            ) : (
              ""
            )}

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                disabled={loading}
              >
                {loading ? (
                  <p className="flex items-center gap-2">
                    Signing In
                    <AiOutlineLoading3Quarters className="animate-spin" />
                  </p>
                ) : (
                  <p>Sign in</p>
                )}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            New User?{" "}
            <Link
              href="/register"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Register Here
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
