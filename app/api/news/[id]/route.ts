import { supabase } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"

// GET: Fetch single news article by ID
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const { data, error } = await supabase.from("news").select("*").eq("id", id).single()

  if (error || !data) {
    return NextResponse.json({ error: "News article not found" }, { status: 404 })
  }

  return NextResponse.json(data)
}

// PUT: Update news article (admin)
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  try {
    const body = await request.json()

    const { data, error } = await supabase.from("news").update(body).eq("id", id).select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ error: "News article not found" }, { status: 404 })
    }

    return NextResponse.json(data[0])
  } catch (err) {
    return NextResponse.json({ error: "Failed to update news article" }, { status: 400 })
  }
}

// DELETE: Delete news article (admin)
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const { error } = await supabase.from("news").delete().eq("id", id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ message: "News article deleted successfully" })
}
