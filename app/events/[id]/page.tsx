"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Calendar, MapPin, Users, ArrowLeft, Download } from "lucide-react"

export default function EventDetail() {
  const params = useParams()
  const eventId = params.id as string
  const [isRegistering, setIsRegistering] = useState(false)

  // Mock event data
  const event = {
    id: eventId,
    title: "Youth Leadership Summit 2025",
    date: "2025-12-15",
    time: "09:00 AM - 05:00 PM",
    location: "New Delhi Convention Center",
    category: "leadership",
    attendees: 500,
    image: "/leadership-summit-conference.jpg",
    description:
      "Join India's premier annual summit for emerging youth leaders. Network with industry experts, government officials, and fellow youth leaders.",
    agenda: [
      { time: "09:00 - 09:30", title: "Registration & Breakfast" },
      { time: "09:30 - 10:30", title: "Keynote Address by Minister" },
      { time: "10:30 - 12:00", title: "Panel Discussion: Future of Youth" },
      { time: "12:00 - 01:00", title: "Lunch Break" },
      { time: "01:00 - 02:30", title: "Breakout Sessions" },
      { time: "02:30 - 05:00", title: "Networking & Closing Ceremony" },
    ],
    speakers: [
      { name: "Dr. Rajesh Kumar", title: "Minister of Youth Affairs" },
      { name: "Ms. Priya Singh", title: "Entrepreneur & Mentor" },
      { name: "Mr. Arjun Patel", title: "Tech Industry Leader" },
    ],
  }

  const handleRegister = async () => {
    setIsRegistering(true)
    // Simulate registration
    setTimeout(() => {
      alert("Registration successful! A confirmation email has been sent.")
      setIsRegistering(false)
    }, 1000)
  }

  const generatePDF = () => {
    alert("PDF generated and ready for download!")
  }

  return (
    <div className="bg-neutral-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/events" className="inline-flex items-center gap-2 text-gov-primary hover:underline mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Events
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <img src={event.image || "/placeholder.svg"} alt={event.title} className="w-full h-96 object-cover" />

          <div className="p-8">
            <h1 className="text-4xl font-bold text-neutral-900 mb-4">{event.title}</h1>

            <div className="space-y-3 mb-8 text-neutral-700">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gov-primary" />
                <span>
                  {new Date(event.date).toLocaleDateString("en-IN")} • {event.time}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gov-primary" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-gov-primary" />
                <span>{event.attendees} expected participants</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mb-8">
              <button
                onClick={handleRegister}
                disabled={isRegistering}
                className="px-8 py-3 bg-gov-primary text-white rounded-lg hover:bg-gov-primary-600 transition-colors font-semibold disabled:opacity-50"
              >
                {isRegistering ? "Registering..." : "Register for Event"}
              </button>
              <button
                onClick={generatePDF}
                className="px-8 py-3 border border-gov-primary text-gov-primary rounded-lg hover:bg-neutral-50 transition-colors font-semibold flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Get PDF
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">About Event</h2>
                <p className="text-neutral-700 leading-relaxed">{event.description}</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">Featured Speakers</h2>
                <div className="space-y-4">
                  {event.speakers.map((speaker, idx) => (
                    <div key={idx} className="border-l-4 border-gov-primary pl-4">
                      <p className="font-bold text-neutral-900">{speaker.name}</p>
                      <p className="text-sm text-neutral-600">{speaker.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-6">Event Agenda</h2>
              <div className="space-y-3">
                {event.agenda.map((item, idx) => (
                  <div key={idx} className="flex gap-4 p-4 bg-neutral-50 rounded-lg">
                    <div className="font-bold text-gov-primary min-w-fit">{item.time}</div>
                    <div className="text-neutral-700">{item.title}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
