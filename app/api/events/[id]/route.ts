import { supabase } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"

// GET: Fetch single event
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const { data, error } = await supabase.from("events").select("*").eq("id", id).single()

  if (error) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 })
  }

  return NextResponse.json(data)
}

// PUT: Update event
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  try {
    const body = await request.json()

    const { data, error } = await supabase.from("events").update(body).eq("id", id).select().single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json({ error: "Failed to update event" }, { status: 400 })
  }
}

// DELETE: Delete event
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const { error } = await supabase.from("events").delete().eq("id", id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ message: "Event deleted" })
}
