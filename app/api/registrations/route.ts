import { supabase } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"

// POST: Register user for event
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { event_id, email, name, phone } = body

    // Validate required fields
    if (!event_id || event_id.trim() === "") {
      return NextResponse.json({ error: "Event ID is required" }, { status: 400 })
    }

    if (!email || !name || !phone) {
      return NextResponse.json({ error: "Name, email, and phone are required" }, { status: 400 })
    }

    // First, check if user exists by email
    const { data: existingUser } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .single()

    let userId: string

    if (existingUser) {
      // User exists, use their ID
      userId = existingUser.id
    } else {
      // Create new user - let Supabase generate UUID
      const { data: newUser, error: userError } = await supabase
        .from("users")
        .insert([
          {
            email,
            name,
            phone,
          },
        ])
        .select()
        .single()

      if (userError) {
        console.error("User creation error:", userError)
        return NextResponse.json({ error: userError.message }, { status: 500 })
      }

      userId = newUser.id
    }

    // Check if already registered for this event
    const { data: existingRegistration } = await supabase
      .from("event_registrations")
      .select("id")
      .eq("event_id", event_id)
      .eq("user_id", userId)
      .single()

    if (existingRegistration) {
      return NextResponse.json({ error: "You are already registered for this event" }, { status: 400 })
    }

    // Register for event
    const { data, error } = await supabase
      .from("event_registrations")
      .insert([
        {
          event_id,
          user_id: userId,
          status: "confirmed",
        },
      ])
      .select()

    if (error) {
      console.error("Registration error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Increment event registered count
    // First get current count
    const { data: eventData } = await supabase
      .from("events")
      .select("registered_count")
      .eq("id", event_id)
      .single()

    if (eventData) {
      const newCount = (eventData.registered_count || 0) + 1
      const { error: updateError } = await supabase
        .from("events")
        .update({ registered_count: newCount })
        .eq("id", event_id)

      if (updateError) {
        console.error("Count update error:", updateError)
      }
    }

    return NextResponse.json(
      {
        registration: data[0],
        reference_number: `REG-${Date.now()}`,
      },
      { status: 201 },
    )
  } catch (err) {
    console.error("Registration failed:", err)
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
