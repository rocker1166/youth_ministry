import type React from "react"
import { Navigation } from "@/app/components/navigation"
import { Footer } from "@/app/components/footer"
import { Chatbot } from "@/app/components/chatbot"

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">{children}</main>
      <Footer />
      {/*<Chatbot />*/}
    </>
  )
}
