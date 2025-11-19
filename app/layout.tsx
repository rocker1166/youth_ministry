import type React from "react"
import type { Metadata } from "next"
import { Noto_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/toaster"
import { AccessibilityProvider } from "@/lib/accessibility-context"
import { ToastProvider } from "@/components/ToastProvider"
import "./globals.css"

const notoSans = Noto_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans",
})

export const metadata: Metadata = {
  title: "Government Portal",
  description: "Institute of Youth Affairs - Official Government Portal",
  generator: "v0.app",
  icons: {
    icon: "/emblem.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${notoSans.variable} font-sans antialiased`}>
        <ToastProvider>
          <AccessibilityProvider>
            {children}
            <Toaster />
            <Analytics />
          </AccessibilityProvider>
        </ToastProvider>
      </body>
    </html>
  )
}
