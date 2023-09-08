"use client"

import { useRouter } from "next/navigation"
import { FormEvent } from "react"

export default function Login() {
  const router = useRouter()

  async function loginUser(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const details = {
      email: formData.get("email"),
      password: formData.get("password"),
    }

    const response = await fetch("http://localhost:5000/api/v1/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // For accepting cookies
      credentials: "include",
      body: JSON.stringify(details),
    })

    const data = await response.json()
    console.log(data)
    if (data.success) {
      router.push("/")
    }
  }
  return (
    <div>
      <form onSubmit={loginUser} className="flex flex-col gap-2">
        <input
          type="text"
          name="email"
          placeholder="Email"
          className="border border-gray-400 rounded-lg p-2"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border border-gray-400 rounded-lg p-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Login
        </button>
      </form>
    </div>
  )
}
