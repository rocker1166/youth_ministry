import { NextResponse } from "next/server"
import { cookies } from "next/headers"

// Simple hardcoded credentials - In production, use proper authentication
const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "admin123", // In production, use hashed passwords
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { username, password } = body

    // Validate credentials
    if (
      username === ADMIN_CREDENTIALS.username &&
      password === ADMIN_CREDENTIALS.password
    ) {
      // Set authentication cookie
      const cookieStore = await cookies()
      
      // Create a simple auth token (in production, use JWT or session tokens)
      const authToken = Buffer.from(`${username}:${Date.now()}`).toString("base64")
      
      cookieStore.set("admin_auth", authToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 24 hours
        path: "/",
      })

      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 401 }
      )
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    )
  }
}
