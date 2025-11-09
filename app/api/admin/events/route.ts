import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const cookieStore = await cookies()

  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
    },
  })

  const { searchParams } = new URL(request.url)
  const limit = Number.parseInt(searchParams.get("limit") || "50")
  const offset = Number.parseInt(searchParams.get("offset") || "0")

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("start_date", { ascending: true })
    .range(offset, offset + limit - 1)

  if (error) return Response.json({ error: error.message }, { status: 400 })
  return Response.json(data)
}

export async function POST(request: Request) {
  const cookieStore = await cookies()

  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
    },
  })

  const body = await request.json()

  const { data, error } = await supabase
    .from("events")
    .insert([body])
    .select()

  if (error) return Response.json({ error: error.message }, { status: 400 })
  return Response.json(data[0])
}

export async function PUT(request: Request) {
  const cookieStore = await cookies()

  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
    },
  })

  const body = await request.json()
  const { id, ...updateData } = body

  const { data, error } = await supabase.from("events").update(updateData).eq("id", id).select()

  if (error) return Response.json({ error: error.message }, { status: 400 })
  return Response.json(data[0])
}

export async function DELETE(request: Request) {
  const cookieStore = await cookies()

  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
    },
  })

  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  if (!id) return Response.json({ error: "ID required" }, { status: 400 })

  const { error } = await supabase.from("events").delete().eq("id", id)

  if (error) return Response.json({ error: error.message }, { status: 400 })
  return Response.json({ success: true })
}
