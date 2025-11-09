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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Events & Workshops</h1>
          <p className="text-sm text-muted-foreground">Discover opportunities to learn, grow, and connect with fellow youth leaders</p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-1.5 shadow-md inline-flex flex-wrap gap-1.5">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-md font-semibold text-sm transition-all duration-200 ${
                selectedCategory === "all"
                  ? "bg-primary text-white shadow-md scale-105"
                  : "text-foreground hover:bg-slate-100 dark:hover:bg-slate-700"
              }`}
            >
              All Events
            </button>
            <button
              onClick={() => setSelectedCategory("leadership")}
              className={`px-4 py-2 rounded-md font-semibold text-sm transition-all duration-200 ${
                selectedCategory === "leadership"
                  ? "bg-primary text-white shadow-md scale-105"
                  : "text-foreground hover:bg-slate-100 dark:hover:bg-slate-700"
              }`}
            >
              Leadership
            </button>
            <button
              onClick={() => setSelectedCategory("training")}
              className={`px-4 py-2 rounded-md font-semibold text-sm transition-all duration-200 ${
                selectedCategory === "training"
                  ? "bg-primary text-white shadow-md scale-105"
                  : "text-foreground hover:bg-slate-100 dark:hover:bg-slate-700"
              }`}
            >
              Training
            </button>
            <button
              onClick={() => setSelectedCategory("entrepreneurship")}
              className={`px-4 py-2 rounded-md font-semibold text-sm transition-all duration-200 ${
                selectedCategory === "entrepreneurship"
                  ? "bg-primary text-white shadow-md scale-105"
                  : "text-foreground hover:bg-slate-100 dark:hover:bg-slate-700"
              }`}
            >
              Entrepreneurship
            </button>
          </div>
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="text-center py-20">
            <Loader2 className="animate-spin h-12 w-12 mx-auto text-primary mb-4" />
            <p className="text-muted-foreground text-lg">Loading events...</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filtered.length === 0 ? (
              <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-xl shadow-md">
                <Calendar className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-lg font-medium">No events found in this category.</p>
                <p className="text-sm text-muted-foreground mt-2">Check back soon for upcoming events!</p>
              </div>
            ) : (
              filtered.map((event) => (
                <div
                  key={event.id}
                  className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-transparent hover:border-primary/20"
                >
                  <div className="grid md:grid-cols-3 gap-4 p-5">
                    {/* Event Image */}
                    <div className="md:col-span-1">
                      <div className="relative h-48 md:h-full rounded-lg overflow-hidden group">
                        <img
                          src={event.image_url || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800"}
                          alt={event.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute top-2 right-2">
                          <span className="bg-primary/90 text-white px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                            {event.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Event Details */}
                    <div className="md:col-span-2 flex flex-col">
                      <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2 hover:text-primary transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                        {event.description}
                      </p>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-foreground/80">
                          <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="font-medium">
                            {new Date(event.start_date).toLocaleDateString("en-IN", {
                              weekday: "long",
                              day: "numeric",
                              month: "short",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-foreground/80">
                          <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-foreground/80">
                          <Users className="w-4 h-4 text-primary flex-shrink-0" />
                          <span>
                            <span className="font-semibold text-primary">{event.registered_count || 0}</span> / {event.capacity} registered
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2.5 mt-auto">
                        <Link
                          href={`/events/${event.id}`}
                          className="px-5 py-2.5 text-sm bg-primary text-white rounded-lg hover:bg-primary/90 transition-all font-semibold shadow-md hover:shadow-lg"
                        >
                          View Details
                        </Link>
                        <Link
                          href={`/events/register?event=${event.id}`}
                          className="px-5 py-2.5 text-sm border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-all font-semibold"
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
