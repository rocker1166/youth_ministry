import { generateText } from "ai"
import { google } from "@ai-sdk/google"

const systemPrompt = `You are a helpful government portal assistant for the Institute of Youth Affairs. 
You provide information about:
- Event registration and details
- Program eligibility and application
- Grievance filing procedures
- General youth development initiatives
- FAQs about services
- **12th National Integration Camp 2025**

Be professional, courteous, and helpful. Keep responses concise and clear.`

const faqContext = `
Common FAQs:
1. Event Registration: Users can register on the Events page by clicking "Register Now" on any event
2. Eligibility: Most programs are for youth aged 18-35 with Indian citizenship
3. Grievance Filing: Go to /grievance page and fill out the form with your details
4. Scholarships: Available in the Programs section with various eligibility criteria
5. Contact: Call +91-11-XXXX-XXXX or email info@youthaffairs.gov.in
`

const campContext = `
[camp]
id = "nic-2025"
title = "12th National Integration Camp"
edition = "12th Edition"
theme = "Empowerment of Youth for Golden India"
organizer = "Institute of Youth Affairs"

[camp.dates]
start = "2025-12-24"
end = "2025-12-31"
duration_days = 8

[camp.location]
venue = "Assam University"
city = "Silchar"
state = "Assam"
country = "India"

[camp.eligibility]
age_min = 14
age_max = 22
registration_fee = "FREE"
expected_participants = 500
eligible_states = ["Sikkim", "Arunachal Pradesh", "Assam", "Tripura", "Manipur", "Meghalaya", "Mizoram", "Nagaland"]

[camp.reporting]
dates = ["2025-12-24", "2025-12-25"]
time = "10:00 AM - 5:00 PM"
place = "Assam University, Silchar"

[camp.inaugural]
date = "2025-12-26"
time = "10:00 AM"
venue = "Auditorium, Assam University, Silchar"

[camp.training]
subjects = ["Yoga", "Aerobics", "Drill", "Music", "Dance", "Recitation", "Self Defence", "Games", "Career Guidance"]
period = "2025-12-26 to 2025-12-30"
timing = "09:00 AM - 04:30 PM"

[camp.training.schedule]
"09:00" = "Assembly"
"10:00-13:30" = "Yoga/Aerobics/Self Defence/Drill/Dance/Music"
"13:30-14:00" = "Lunch Break"
"14:00-15:30" = "National Seminars"
"15:30-16:30" = "Games"
"16:30" = "Day Off"

[camp.faculties]
names = ["Prof. Alok K. Banerjee", "Dr. Tritha Pratim Das (ISRO)", "Dr. Sunny Mandachanda (DRDO)", "Shri Tithankar Chanda", "Smt. Archana Mondal", "Shri Mihir Bhattacharya", "Shri Anupam Chattopadhyay", "Shri Soumen Ghosh", "Shri Shantanu Chandra", "NCB Representatives", "Indian Army", "Indian Air Force", "Indian Navy"]

[camp.cooperating_bodies]
organizations = ["Government of Assam", "North Eastern Council, GOI", "DRDO", "Ministry of Defence, GOI", "Assam University (Central University)"]

[camp.vvip_guests]
guests = ["Dr. Himanta Biswa Sarma (CM, Assam)", "Dr. Sukanta Majumdar (MOS Education & NE Development)", "Shri Parimal Suklabaidya (MP, Lok Sabha)", "Shri Kanad Purkayastha (MP, Lok Sabha)", "Shri Kaushik Rai (Minister, Assam)"]

[camp.objectives]
list = [
  "Empower youth for worthy human beings",
  "Promote national integration, unity, peace",
  "Develop leadership & responsibility",
  "Support Science research & innovation",
  "Arouse consciousness about Cultural Heritage",
  "Help poor & meritorious students",
  "Engage in social service & community development",
  "Foster Literacy, Scientific & Technical Education",
  "Promote govt Scientific & Cultural projects",
  "Popularize democracy & Nationalism",
  "Arrange national seminars, lectures, exhibitions",
  "Train in Self-development & National Integration",
  "Strengthen youth participation in democracy",
  "Provide skill development for employability",
  "Foster spirit of volunteerism"
]

[camp.events."2025-12-26"]
events = ["Inaugural Ceremony", "Youth Role in Space Science Exploration", "Empowering Youth for Global Leadership in Science", "Cultural Programmes"]

[camp.events."2025-12-27"]
events = ["Youth in Atmanirbhar Bharat Defence R&D", "Drug Abuse Effects & Prevention", "Indian Culture: Heritage, Diversity, Sustainability", "Cultural Workshop on Drama", "Cultural Programmes"]

[camp.events."2025-12-28"]
events = ["Design Dreams in Ministry Defence", "Environment Pollution & Remediation", "Cultural Workshop on Drama", "Cultural Programmes"]

[camp.events."2025-12-29"]
events = ["National Integration via Outdoor Education & Sports", "AI: Literacy, Applications, Security, Future", "Cultural Workshop on Drama", "Cultural Programmes"]

[camp.events."2025-12-30"]
events = ["Youth Empowerment for Golden India", "Valedictory Ceremony with Prizes & Cultural Programmes"]

[camp.benefits]
provided = ["8 days residential training", "Free accommodation", "Lunch & refreshments", "Expert training", "Self-defense & first-aid", "Career guidance", "Cultural exchange", "Certificates & awards", "Meet VVIPs"]

[camp.contact]
organization = "Institute of Youth Affairs"
address = "11/1, S. N. Banerjee Road, BKP., Kolkata – 700 120"
phone = "033 7148 1515"
mobile = "7439841005"
email = "youthaffairs14@gmail.com"
registration_url = "/camp or /camp/nic-2025"

[camp.leadership]
chief_advisor = "Prof. Tathagata Roy (Fmr Governor: Tripura, Meghalaya, Arunachal Pradesh)"
president_camp = "Shri Kajal Kumar Sur"
president_org = "Prof. (Dr.) Basab Chaudhury (Fmr VC, WBSU)"
general_secretary = "Smt. Mohuya Saha"

[camp.history]
since = 2014
past_states = ["Karnataka", "Rajasthan", "Goa", "Meghalaya", "Gujarat", "Assam", "Tamil Nadu", "Tripura", "Andaman & Nicobar", "Arunachal Pradesh", "Sikkim"]
mission = "Encourage young minds in Science, exchange cultural ties, create eternal bonds across India with people-centered development programs."
`

export async function POST(req: Request) {
  const { messages } = await req.json()

  try {
    const response = await generateText({
      model: google("gemini-2.0-flash-exp"),
      system: systemPrompt + "\n\n" + faqContext + "\n\n" + campContext,
      messages: messages.map((msg: any) => ({
        role: msg.role,
        content: msg.content,
      })),
      temperature: 0.7,
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
