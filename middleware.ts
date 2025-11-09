import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Check if the request is for admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Check for auth cookie
    const authCookie = request.cookies.get("admin_auth")
    
    // If no auth cookie and not on login page, redirect to login
    if (!authCookie && !request.nextUrl.pathname.startsWith("/admin/login")) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
    
    // If authenticated and trying to access login page, redirect to dashboard
    if (authCookie && request.nextUrl.pathname === "/admin/login") {
      return NextResponse.redirect(new URL("/admin", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
