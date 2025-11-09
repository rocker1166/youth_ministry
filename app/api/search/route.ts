import { supabase } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"

// GET: Global search across all content
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q") || ""
  const language = searchParams.get("lang") || "en"

  if (query.length < 2) {
    return NextResponse.json({ error: "Query must be at least 2 characters" }, { status: 400 })
  }

  // Search events
  const { data: events } = await supabase
    .from("events")
    .select("id, title, description, start_date")
    .ilike("title", `%${query}%`)
    .limit(5)

  // Search news
  const { data: news } = await supabase
    .from("news")
    .select("id, title, slug, excerpt")
    .eq("status", "published")
    .ilike("title", `%${query}%`)
    .limit(5)

  // Search programs
  const { data: programs } = await supabase
    .from("programs")
    .select("id, title, description")
    .ilike("title", `%${query}%`)
    .limit(5)

  // Search FAQs
  const field = language === "hi" ? "question_hi" : "question_en"
  const { data: faqs } = await supabase
    .from("faq")
    .select("id, question_en, question_hi, category")
    .ilike(field, `%${query}%`)
    .limit(5)

  return NextResponse.json({
    events: events || [],
    news: news || [],
    programs: programs || [],
    faqs: faqs || [],
    total: (events?.length || 0) + (news?.length || 0) + (programs?.length || 0) + (faqs?.length || 0),
  })
}
