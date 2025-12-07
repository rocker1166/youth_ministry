"use client"

import Link from "next/link"
import { Calendar, MapPin, Users } from "lucide-react"
import { CAMP_2025 } from "@/app/(public)/camp/data"

export default function UpcomingEvents() {
  // Create event cards from the actual camp data
  const campEvents = [
    {
      id: CAMP_2025.id,
      title: CAMP_2025.title,
      date: CAMP_2025.startDate,
      location: CAMP_2025.location,
      attendees: CAMP_2025.expectedParticipants,
      category: CAMP_2025.category,
      status: CAMP_2025.status === "upcoming" ? "Registrations Open" : "Closed",
    },
    // Science Exhibition as a separate event
    ...(CAMP_2025.scienceExhibition ? [{
      id: `${CAMP_2025.id}-science`,
      title: CAMP_2025.scienceExhibition.title,
      date: CAMP_2025.scienceExhibition.dates.start,
      location: CAMP_2025.scienceExhibition.venue,
      attendees: CAMP_2025.expectedParticipants,
      category: "Science & Technology",
      status: "Registrations Open",
    }] : []),
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

        {/* Horizontal Scrollable Container - Show 3 at a time */}
        <div className="relative overflow-hidden">
          <div 
            className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-primary scrollbar-track-gray-200"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#1e40af #e5e7eb'
            }}
          >
            {campEvents.map((event) => (
              <Link 
                key={event.id}
                href={`/camp/${CAMP_2025.id}`}
                className="flex-shrink-0 w-full md:w-[calc(33.333%-1rem)] snap-start"
              >
                <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-primary hover:shadow-lg transition-all duration-300 group cursor-pointer h-full">
                  <div className="flex flex-col gap-4 h-full">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary text-white">
                          {event.category}
                        </span>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                          {event.status}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {event.title}
                      </h3>
                      
                      <div className="flex flex-col gap-2 text-sm text-gray-600">
                        <span className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="truncate">
                            {new Date(event.date).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "long",
                              year: "numeric"
                            })}
                          </span>
                        </span>
                        <span className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="truncate">{event.location}</span>
                        </span>
                        <span className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-primary flex-shrink-0" />
                          {event.attendees} expected
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="text-center mt-4 text-sm text-gray-500">
          Scroll horizontally to view all events
        </div>
      </div>
    </section>
  )
}
