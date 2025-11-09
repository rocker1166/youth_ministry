import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

const systemPrompt = `You are a helpful government portal assistant for the Institute of Youth Affairs. 
You provide information about:
- Event registration and details
- Program eligibility and application
- Grievance filing procedures
- General youth development initiatives
- FAQs about services

Be professional, courteous, and helpful. Keep responses concise and clear.`

const faqContext = `
Common FAQs:
1. Event Registration: Users can register on the Events page by clicking "Register Now" on any event
2. Eligibility: Most programs are for youth aged 18-35 with Indian citizenship
3. Grievance Filing: Go to /grievance page and fill out the form with your details
4. Scholarships: Available in the Programs section with various eligibility criteria
5. Contact: Call +91-11-XXXX-XXXX or email info@youthaffairs.gov.in
`

export async function POST(req: Request) {
  const { messages } = await req.json()

  try {
    const response = await generateText({
      model: openai("gpt-4-turbo"),
      system: systemPrompt + "\n\n" + faqContext,
      messages: messages.map((msg: any) => ({
        role: msg.role,
        content: msg.content,
      })),
      temperature: 0.7,
      maxTokens: 500,
    })

    return Response.json({
      id: Math.random().toString(36).substr(2, 9),
      role: "assistant",
      content: response.text,
    })
  } catch (error) {
    console.error("Chat error:", error)
    return Response.json({ error: "Failed to generate response" }, { status: 500 })
  }
}
