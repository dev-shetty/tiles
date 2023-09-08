"use client"

export default function Logout() {
  async function logoutUser() {
    const response = await fetch("http://localhost:5000/api/v1/user/logout", {
      method: "GET",
      credentials: "include",
    })
    const data = await response.json()
    console.log(data)
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
