"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { FormEvent } from "react"

export default function Register() {
  const router = useRouter()

  async function registerUser(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const details = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    }

    const response = await fetch("http://localhost:5000/api/v1/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    })

    const data = await response.json()
    console.log(data)

    // TODO: Error Handling
    if (data.success) router.push("/login")
  }

  return (
    <div>
      <form onSubmit={registerUser} className="flex flex-col gap-2">
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="border border-gray-400 rounded-lg p-2"
        />
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
          Register
        </button>
      </form>
      <p>
        Already Registered?{" "}
        <Link href="/login" className="text-blue-500 underline">
          Login
        </Link>
      </p>
    </div>
  )
}
