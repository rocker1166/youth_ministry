import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const cookieStore = await cookies()
  const { id } = await params

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
      },
    }
  )

  // Fetch registrations with user details using JOIN
  const { data, error } = await supabase
    .from("event_registrations")
    .select(
      `
      id,
      registration_date,
      status,
      is_attended,
      feedback,
      rating,
      users (
        id,
        name,
        email,
        phone,
        state,
        city
      )
    `
    )
    .eq("event_id", id)
    .order("registration_date", { ascending: false })

  if (error) {
    console.error("Error fetching registrations:", error)
    return Response.json({ error: error.message }, { status: 400 })
  }

  // Transform data to flatten user details
  const registrations = data.map((reg: any) => ({
    id: reg.id,
    registration_date: reg.registration_date,
    status: reg.status,
    is_attended: reg.is_attended,
    feedback: reg.feedback,
    rating: reg.rating,
    user_id: reg.users?.id,
    name: reg.users?.name,
    email: reg.users?.email,
    phone: reg.users?.phone,
    state: reg.users?.state,
    city: reg.users?.city,
  }))

  return Response.json(registrations)
}

// Export registrations to CSV
export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const cookieStore = await cookies()
  const { id } = await params

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
      },
    }
  )

  const { data, error } = await supabase
    .from("event_registrations")
    .select(
      `
      registration_date,
      status,
      is_attended,
      users (
        name,
        email,
        phone,
        state,
        city
      )
    `
    )
    .eq("event_id", id)
    .order("registration_date", { ascending: false })

  if (error) {
    return Response.json({ error: error.message }, { status: 400 })
  }

  // Generate CSV
  const headers = ["Name", "Email", "Phone", "State", "City", "Registration Date", "Status", "Attended"]
  const rows = data.map((reg: any) => [
    reg.users?.name || "",
    reg.users?.email || "",
    reg.users?.phone || "",
    reg.users?.state || "",
    reg.users?.city || "",
    new Date(reg.registration_date).toLocaleDateString(),
    reg.status,
    reg.is_attended ? "Yes" : "No",
  ])

  const csv = [headers, ...rows].map((row) => row.join(",")).join("\n")

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="event-registrations-${id}.csv"`,
    },
  })
}
