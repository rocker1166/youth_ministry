import Link from "next/link"
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function UpcomingEvents() {
  const events = [
    {
      id: 1,
      title: "Youth Leadership Summit 2025",
      date: "2025-12-15",
      location: "New Delhi",
      attendees: 500,
      category: "Leadership",
      status: "Registrations Open",
    },
    {
      id: 2,
      title: "Digital Skills Workshop",
      date: "2025-12-20",
      location: "Mumbai",
      attendees: 200,
      category: "Technology",
      status: "Limited Seats",
    },
    {
      id: 3,
      title: "Startup Pitch Competition",
      date: "2025-12-28",
      location: "Bangalore",
      attendees: 300,
      category: "Entrepreneurship",
      status: "Registrations Open",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Upcoming <span className="text-primary">Events</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join us for exciting events designed to empower and engage youth across India
          </p>
        </div>

        <div className="grid gap-6 mb-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-primary hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary text-white">
                      {event.category}
                    </span>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                      event.status === "Limited Seats" 
                        ? "bg-orange-100 text-orange-700" 
                        : "bg-green-100 text-green-700"
                    }`}>
                      {event.status}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      {new Date(event.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric"
                      })}
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      {event.location}
                    </span>
                    <span className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" />
                      {event.attendees} expected
                    </span>
                  </div>
                </div>
                
                <Link href={`/events/${event.id}`}>
                  <Button className="bg-primary hover:bg-primary-700 text-white group-hover:scale-105 transition-transform">
                    Register Now
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Link 
            href="/events" 
            className="inline-flex items-center gap-2 text-primary font-semibold hover:underline text-lg group"
          >
            View All Events 
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}
