// Database client for direct SQL queries using Supabase
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""

export const supabase = createClient(supabaseUrl, supabaseKey)

// Helper functions for common queries
export async function getEvents(status = "upcoming", limit = 10) {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("status", status)
    .order("start_date", { ascending: true })
    .limit(limit)

  if (error) console.error("Error fetching events:", error)
  return data || []
}

export async function getNews(limit = 10) {
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(limit)

  if (error) console.error("Error fetching news:", error)
  return data || []
}

export async function getGallery(limit = 12) {
  const { data, error } = await supabase
    .from("gallery")
    .select("*")
    .order("uploaded_at", { ascending: false })
    .limit(limit)

  if (error) console.error("Error fetching gallery:", error)
  return data || []
}

export async function getPrograms() {
  const { data, error } = await supabase
    .from("programs")
    .select("*")
    .eq("status", "active")
    .order("created_at", { ascending: false })

  if (error) console.error("Error fetching programs:", error)
  return data || []
}

export async function getFAQ() {
  const { data, error } = await supabase.from("faq").select("*").order("created_at", { ascending: false })

  if (error) console.error("Error fetching FAQs:", error)
  return data || []
}

export async function getSiteSettings() {
  const { data, error } = await supabase.from("site_settings").select("key, value")

  if (error) console.error("Error fetching settings:", error)

  const settings: Record<string, string> = {}
  data?.forEach((setting: { key: string; value: string }) => {
    settings[setting.key] = setting.value
  })

  return settings
}
