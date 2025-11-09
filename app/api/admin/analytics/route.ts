import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function GET() {
  const cookieStore = await cookies()

  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
    },
  })

  try {
    const [usersRes, eventsRes, registrationsRes, newsRes] = await Promise.all([
      supabase.from("users").select("id", { count: "exact", head: true }),
      supabase.from("events").select("id", { count: "exact", head: true }),
      supabase.from("event_registrations").select("id", { count: "exact", head: true }),
      supabase.from("news").select("id", { count: "exact", head: true }).eq("status", "published"),
    ])

    const analytics = {
      totalUsers: usersRes.count || 0,
      totalEvents: eventsRes.count || 0,
      totalRegistrations: registrationsRes.count || 0,
      publishedNews: newsRes.count || 0,
    }

    return Response.json(analytics)
  } catch (error) {
    return Response.json({ error: "Failed to fetch analytics" }, { status: 500 })
  }
}
