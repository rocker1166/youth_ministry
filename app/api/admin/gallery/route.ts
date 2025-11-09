import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

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
  const status = searchParams.get("status")

  let query = supabase.from("gallery").select("*").order("uploaded_at", { ascending: false })

  if (status) {
    query = query.eq("status", status)
  }

  const { data, error } = await query

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
    .from("gallery")
    .insert({
      title: body.title,
      description: body.description,
      image_url: body.image_url,
      video_url: body.video_url,
      category: body.category,
      event_id: body.event_id,
      status: "pending",
    })
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

  const { data, error } = await supabase
    .from("gallery")
    .update({ status: body.status, approved_at: new Date() })
    .eq("id", body.id)
    .select()

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

  const { error } = await supabase.from("gallery").delete().eq("id", id)

  if (error) return Response.json({ error: error.message }, { status: 400 })
  return Response.json({ success: true })
}
