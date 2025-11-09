import Link from "next/link"

export default function UpcomingEvents() {
  const events = [
    {
      id: 1,
      title: "Youth Leadership Summit 2025",
      date: "2025-12-15",
      location: "New Delhi",
      attendees: 500,
    },
    {
      id: 2,
      title: "Digital Skills Workshop",
      date: "2025-12-20",
      location: "Mumbai",
      attendees: 200,
    },
    {
      id: 3,
      title: "Startup Pitch Competition",
      date: "2025-12-28",
      location: "Bangalore",
      attendees: 300,
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-12 text-neutral-900">Upcoming Events</h2>
        <div className="grid gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-neutral-50 p-6 rounded-lg border border-neutral-200 hover:shadow-md transition-shadow flex justify-between items-center"
            >
              <div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">{event.title}</h3>
                <div className="flex flex-wrap gap-4 text-sm text-neutral-600">
                  <span>📅 {new Date(event.date).toLocaleDateString("en-IN")}</span>
                  <span>📍 {event.location}</span>
                  <span>👥 {event.attendees} expected</span>
                </div>
              </div>
              <Link
                href={`/events/${event.id}`}
                className="px-4 py-2 bg-gov-primary text-white rounded-lg hover:bg-gov-primary-600 transition-colors whitespace-nowrap"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/events" className="text-gov-primary font-semibold hover:underline">
            View All Events →
          </Link>
        </div>
      </div>
    </section>
  )
}
