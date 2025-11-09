import { supabase } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"

// GET: Fetch all events or filtered events
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get("status") || "upcoming"
  const category = searchParams.get("category")
  const limit = Number.parseInt(searchParams.get("limit") || "10")

  let query = supabase.from("events").select("*").eq("status", status)

  if (category) {
    query = query.eq("category", category)
  }

  const { data, error } = await query.order("start_date", { ascending: true }).limit(limit)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

// POST: Create new event (admin only)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { data, error } = await supabase.from("events").insert([body]).select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data[0], { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: "Failed to create event" }, { status: 400 })
  }
}
