import type React from "react"
import type { Metadata } from "next"
import { Noto_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/app/components/ui/toaster"
import { AccessibilityProvider } from "@/lib/accessibility-context"
import { ToastProvider } from "@/app/components/ToastProvider"
import { ContentProtection } from "@/app/components/ContentProtection"
import "./globals.css"

const notoSans = Noto_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans",
})

export const metadata: Metadata = {
  title: "Institute of Youth Affairs",
  description: "Institute of Youth Affairs",
  generator: "IOYA",
  icons: {
    icon: "/logo/LOGO.jpg",
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
        <ContentProtection />
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
