import UserProvider from "@/provider/UserProvider"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Navbar from "@/components/Navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Tiles",
  description: "Tiles and Fun",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-100`}>
        <UserProvider>
          <Navbar />
          <main className="container mx-auto min-h-screen flex items-center justify-center">
            {children}
          </main>
        </UserProvider>
      </body>
    </html>
  )
}
