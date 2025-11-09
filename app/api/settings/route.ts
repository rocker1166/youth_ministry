import { supabase } from "@/lib/db"
import { NextResponse } from "next/server"

// GET: Fetch all site settings
export async function GET() {
  const { data, error } = await supabase.from("site_settings").select("key, value")

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const settings: Record<string, string> = {}
  data?.forEach((setting: { key: string; value: string }) => {
    settings[setting.key] = setting.value
  })

  return NextResponse.json(settings)
}
