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
  const limit = Number.parseInt(searchParams.get("limit") || "50")
  const offset = Number.parseInt(searchParams.get("offset") || "0")

  const { data, error } = await supabase
    .from("users")
    .select("id, email, name, phone, state, city, created_at")
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) return Response.json({ error: error.message }, { status: 400 })

  return Response.json(data)
}
