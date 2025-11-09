import { supabase } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"

// GET: Fetch FAQ items
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const language = searchParams.get("lang") || "en"
  const category = searchParams.get("category")

  let query = supabase.from("faq").select("*")

  if (category) {
    query = query.eq("category", category)
  }

  const { data, error } = await query.order("created_at", {
    ascending: false,
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Transform data to selected language
  const transformedData = data?.map((item) => ({
    ...item,
    question: language === "hi" ? item.question_hi : item.question_en,
    answer: language === "hi" ? item.answer_hi : item.answer_en,
  }))

  return NextResponse.json(transformedData)
}
