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
    // Basic counts
    const [usersRes, eventsRes, registrationsRes, newsRes] = await Promise.all([
      supabase.from("users").select("id", { count: "exact", head: true }),
      supabase.from("events").select("id", { count: "exact", head: true }),
      supabase.from("event_registrations").select("id", { count: "exact", head: true }),
      supabase.from("news").select("id", { count: "exact", head: true }).eq("status", "published"),
    ])

    // Monthly registrations for the last 11 months
    const { data: monthlyRegistrationsData } = await supabase.rpc('get_monthly_registrations')

    // Event categories distribution
    const { data: eventCategoriesData } = await supabase
      .from("events")
      .select("category")
    
    // Count categories
    const categoryCounts: { [key: string]: number } = {}
    eventCategoriesData?.forEach((event) => {
      const category = event.category || "Uncategorized"
      categoryCounts[category] = (categoryCounts[category] || 0) + 1
    })

    const eventCategories = Object.entries(categoryCounts).map(([name, value]) => ({
      name,
      value,
    }))

    // Weekly activity (last 7 days)
    const { data: weeklyActivityData } = await supabase.rpc('get_weekly_activity')

    // News engagement by category
    const { data: newsEngagementData } = await supabase
      .from("news")
      .select("category")
      .eq("status", "published")

    // Count news by category
    const newsCategoryCounts: { [key: string]: number } = {}
    newsEngagementData?.forEach((news) => {
      const category = news.category || "General"
      newsCategoryCounts[category] = (newsCategoryCounts[category] || 0) + 1
    })

    const newsEngagement = Object.entries(newsCategoryCounts).map(([category, count]) => ({
      category,
      articles: count,
      // Simulate views and shares based on article count
      views: count * Math.floor(Math.random() * 200) + 500,
      shares: count * Math.floor(Math.random() * 20) + 30,
    }))

    const analytics = {
      totalUsers: usersRes.count || 0,
      totalEvents: eventsRes.count || 0,
      totalRegistrations: registrationsRes.count || 0,
      publishedNews: newsRes.count || 0,
      monthlyRegistrations: monthlyRegistrationsData || [],
      eventCategories,
      weeklyActivity: weeklyActivityData || [],
      newsEngagement,
    }

    return Response.json(analytics)
  } catch (error) {
    console.error("Analytics error:", error)
    return Response.json({ error: "Failed to fetch analytics" }, { status: 500 })
  }
}
