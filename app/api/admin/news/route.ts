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

  let query = supabase.from("news").select("*").order("created_at", { ascending: false })

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
  const slug = body.title.toLowerCase().replace(/\s+/g, "-")

  const { data, error } = await supabase
    .from("news")
    .insert({
      title: body.title,
      slug,
      content: body.content,
      excerpt: body.excerpt,
      category: body.category,
      status: body.status || "draft",
      published_at: body.status === "published" ? new Date() : null,
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

  const { data, error } = await supabase.from("news").update(body).eq("id", body.id).select()

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

  const { error } = await supabase.from("news").delete().eq("id", id)

  if (error) return Response.json({ error: error.message }, { status: 400 })
  return Response.json({ success: true })
}
