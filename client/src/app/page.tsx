import Home from "@/components/Home"
import { cookies } from "next/headers"

export default function page() {
  const token = cookies().get("access_token")
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex gap-8 items-center">
        <Home token={token} />
      </div>
    </main>
  )
}
