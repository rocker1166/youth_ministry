import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Dashboard - Institute of Youth Affairs",
  description: "Admin panel for managing events, news, and content",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
