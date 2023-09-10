"use client"

import { useUser } from "@/provider/UserProvider"

export default function Logout() {
  const { setUser } = useUser()

  async function logoutUser() {
    // const response = await fetch("http://localhost:5000/api/v1/user/logout", {
    //   credentials: "include",
    // })
    // const data = await response.json()
    // if (data.success) setUser!(null)
    sessionStorage.removeItem("access_token")
    setUser!(null)
  }

  return (
    <div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        onClick={logoutUser}
      >
        Logout
      </button>
    </div>
  )
}
