import { supabase } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"

// GET: Fetch gallery items
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")
  const limit = Number.parseInt(searchParams.get("limit") || "12")

  let query = supabase.from("gallery").select("*")

  if (category) {
    query = query.eq("category", category)
  }

  const { data, error } = await query.order("uploaded_at", { ascending: false }).limit(limit)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

// POST: Upload gallery item (admin)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { data, error } = await supabase.from("gallery").insert([body]).select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data[0], { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: "Failed to upload gallery item" }, { status: 400 })
  }
}
