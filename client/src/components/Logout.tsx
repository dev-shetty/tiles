"use client"

import { useUser } from "@/provider/UserProvider"

export default function Logout() {
  const { user, setUser } = useUser()

  async function logoutUser() {
    if (user?.name.startsWith("Guest")) {
      const response = await fetch(
        `http://localhost:5000/api/v1/user/${user._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
          },
        }
      )

      const data = await response.json()
      if (data.success) {
        sessionStorage.removeItem("access_token")
        setUser!(null)
      }
    } else {
      sessionStorage.removeItem("access_token")
      setUser!(null)
    }
  }

  return (
    <div>
      <button
        className="flex w-full justify-center rounded-md bg-indigo-600 px-4 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={logoutUser}
      >
        Logout
      </button>
    </div>
  )
}
