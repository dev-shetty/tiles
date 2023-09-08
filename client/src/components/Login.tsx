"use client"
import { FormEvent } from "react"

export default function Register() {
  async function registerUser(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const details = {
      name: formData.get("name")?.toString(),
      email: formData.get("email")?.toString(),
      password: formData.get("password")?.toString(),
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
    </div>
  )
}
