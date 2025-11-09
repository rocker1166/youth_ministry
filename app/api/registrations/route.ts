import { supabase } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"

// POST: Register user for event
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { event_id, user_id, email, name, phone } = body

    // First, create/upsert user
    const { data: userData, error: userError } = await supabase
      .from("users")
      .upsert(
        {
          id: user_id,
          email,
          name,
          phone,
        },
        { onConflict: "email" },
      )
      .select()
      .single()

    if (userError && userError.code !== "PGRST116") {
      return NextResponse.json({ error: userError.message }, { status: 500 })
    }

    // Then register for event
    const { data, error } = await supabase
      .from("event_registrations")
      .insert([
        {
          event_id,
          user_id: userData?.id || user_id,
          status: "confirmed",
        },
      ])
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Increment event registered count
    await supabase.rpc("increment_event_registrations", { event_id })

    return NextResponse.json(
      {
        registration: data[0],
        reference_number: `REG-${Date.now()}`,
      },
      { status: 201 },
    )
  } catch (err) {
    return NextResponse.json({ error: "Failed to register for event" }, { status: 400 })
  }
}

// GET: Fetch registrations for a user
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("user_id")

  if (!userId) {
    return NextResponse.json({ error: "user_id is required" }, { status: 400 })
  }

  const { data, error } = await supabase
    .from("event_registrations")
    .select("*, events(title, start_date, location)")
    .eq("user_id", userId)
    .order("registration_date", { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}
