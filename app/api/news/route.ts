import { supabase } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"

// GET: Fetch all published news
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const limit = Number.parseInt(searchParams.get("limit") || "10")
  const category = searchParams.get("category")

  let query = supabase.from("news").select("*").eq("status", "published").order("published_at", { ascending: false })

  if (category) {
    query = query.eq("category", category)
  }

  const { data, error } = await query.limit(limit)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

// POST: Create news article (admin)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { data, error } = await supabase.from("news").insert([body]).select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data[0], { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: "Failed to create news article" }, { status: 400 })
  }
}
