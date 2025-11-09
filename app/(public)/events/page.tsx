"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Calendar, MapPin, Users, Loader2 } from "lucide-react"

// Dummy fallback data
const DUMMY_EVENTS = [
  {
    id: "dummy-1",
    title: "Youth Leadership Summit 2025",
    start_date: "2025-12-15T09:00:00",
    end_date: "2025-12-15T17:00:00",
    location: "New Delhi Convention Center",
    category: "leadership",
    capacity: 500,
    registered_count: 245,
    description: "Annual summit for emerging youth leaders. Network with industry experts, government officials, and fellow youth leaders.",
    image_url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
    status: "upcoming",
  },
  {
    id: "dummy-2",
    title: "Digital Skills Workshop",
    start_date: "2025-12-20T10:00:00",
    end_date: "2025-12-20T16:00:00",
    location: "Mumbai Tech Hub",
    category: "training",
    capacity: 200,
    registered_count: 156,
    description: "Hands-on workshop on latest digital technologies including AI, Cloud Computing, and Web Development.",
    image_url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800",
    status: "upcoming",
  },
  {
    id: "dummy-3",
    title: "Startup Pitch Competition",
    start_date: "2025-12-28T14:00:00",
    end_date: "2025-12-28T18:00:00",
    location: "Bangalore Innovation Center",
    category: "entrepreneurship",
    capacity: 300,
    registered_count: 189,
    description: "Showcase your startup idea to investors and industry leaders. Win prizes worth ₹5 lakhs!",
    image_url: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800",
    status: "upcoming",
  },
  {
    id: "dummy-4",
    title: "Community Service Initiative",
    start_date: "2026-01-10T08:00:00",
    end_date: "2026-01-10T15:00:00",
    location: "Various Locations",
    category: "workshop",
    capacity: 150,
    registered_count: 78,
    description: "Join us for a day of community service and make a positive impact in local communities.",
    image_url: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800",
    status: "upcoming",
  },
]

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [events, setEvents] = useState(DUMMY_EVENTS)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/events?limit=50&status=upcoming")
      if (res.ok) {
        const data = await res.json()
        // If data is empty or null, use dummy data
        if (data && data.length > 0) {
          setEvents(data)
        } else {
          console.log("No events from API, using dummy data")
          setEvents(DUMMY_EVENTS)
        }
      } else {
        console.log("API error, using dummy data")
        setEvents(DUMMY_EVENTS)
      }
    } catch (error) {
      console.error("Failed to fetch events:", error)
      setEvents(DUMMY_EVENTS)
    } finally {
      setLoading(false)
    }
  }

  const filtered = selectedCategory === "all" ? events : events.filter((e) => e.category === selectedCategory)

  return (
    <div className="bg-neutral-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-neutral-900 mb-8">Events & Workshops</h1>

        {/* Filter */}
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedCategory === "all"
                ? "bg-gov-primary text-white"
                : "bg-white text-neutral-700 border border-neutral-200 hover:border-gov-primary"
            }`}
          >
            All Events
          </button>
          <button
            onClick={() => setSelectedCategory("leadership")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedCategory === "leadership"
                ? "bg-gov-primary text-white"
                : "bg-white text-neutral-700 border border-neutral-200 hover:border-gov-primary"
            }`}
          >
            Leadership
          </button>
          <button
            onClick={() => setSelectedCategory("training")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedCategory === "training"
                ? "bg-gov-primary text-white"
                : "bg-white text-neutral-700 border border-neutral-200 hover:border-gov-primary"
            }`}
          >
            Training
          </button>
          <button
            onClick={() => setSelectedCategory("entrepreneurship")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedCategory === "entrepreneurship"
                ? "bg-gov-primary text-white"
                : "bg-white text-neutral-700 border border-neutral-200 hover:border-gov-primary"
            }`}
          >
            Entrepreneurship
          </button>
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="text-center py-12">
            <Loader2 className="animate-spin h-12 w-12 mx-auto text-primary mb-4" />
            <p className="text-neutral-600">Loading events...</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filtered.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg">
                <p className="text-neutral-600 text-lg">No events found in this category.</p>
              </div>
            ) : (
              filtered.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="grid md:grid-cols-3 gap-6 p-6">
                    <img
                      src={event.image_url || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800"}
                      alt={event.title}
                      className="w-full h-48 object-cover rounded-lg md:col-span-1"
                    />
                    <div className="md:col-span-2">
                      <h3 className="text-2xl font-bold text-neutral-900 mb-2">{event.title}</h3>
                      <p className="text-neutral-600 mb-4 line-clamp-2">{event.description}</p>

                      <div className="space-y-2 mb-6 text-sm">
                        <div className="flex items-center gap-2 text-neutral-700">
                          <Calendar className="w-4 h-4" />
                          {new Date(event.start_date).toLocaleDateString("en-IN", {
                            weekday: "long",
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                        <div className="flex items-center gap-2 text-neutral-700">
                          <MapPin className="w-4 h-4" />
                          {event.location}
                        </div>
                        <div className="flex items-center gap-2 text-neutral-700">
                          <Users className="w-4 h-4" />
                          {event.registered_count || 0} / {event.capacity} registered
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <Link
                          href={`/events/${event.id}`}
                          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors font-medium"
                        >
                          View Details
                        </Link>
                        <Link
                          href={`/events/register?event=${event.id}`}
                          className="px-6 py-2 border border-primary text-primary rounded-lg hover:bg-neutral-50 transition-colors font-medium"
                        >
                          Register Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}
