import { supabase } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"

// POST: Submit contact form
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { data, error } = await supabase
      .from("contact_submissions")
      .insert([
        {
          name: body.name,
          email: body.email,
          phone: body.phone,
          subject: body.subject,
          message: body.message,
          status: "new",
        },
      ])
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(
      {
        message: "Contact submission received",
        id: data[0].id,
      },
      { status: 201 },
    )
  } catch (err) {
    return NextResponse.json({ error: "Failed to submit contact form" }, { status: 400 })
  }
}
