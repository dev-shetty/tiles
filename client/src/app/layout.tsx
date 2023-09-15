import UserProvider from "@/provider/UserProvider"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Navbar from "@/components/Navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Tiles",
  description: "Place a tile and contribute to the canvas!",
  authors: [
    {
      name: "Deveesh Shetty",
      url: "deveesh.vercel.app",
    },
  ],
  creator: "Deveesh Shetty",
  keywords: ["tiles", "canvas", "pixel", "art", "drawing"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://placetile.vercel.app",
    title: "Tiles",
    description: "Place a tile and contribute to the canvas!",
    siteName: "Tiles",
    images: [
      {
        url: "https://placetile.vercel.app/og.jpg",
        width: 1200,
        height: 630,
        alt: "Tiles",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tiles",
    description: "Place a tile and contribute to the canvas!",
    images: ["https://placetile.vercel.app/og.jpg"],
    creator: "@ShettyDeveesh",
  },
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
