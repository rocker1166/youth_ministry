"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar, MapPin, Users } from "lucide-react"

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const events = [
    {
      id: 1,
      title: "Youth Leadership Summit 2025",
      date: "2025-12-15",
      time: "09:00 AM - 05:00 PM",
      location: "New Delhi",
      category: "leadership",
      attendees: 500,
      description: "Annual summit for emerging youth leaders",
      image: "/leadership-summit.jpg",
    },
    {
      id: 2,
      title: "Digital Skills Workshop",
      date: "2025-12-20",
      time: "10:00 AM - 04:00 PM",
      location: "Mumbai",
      category: "training",
      attendees: 200,
      description: "Hands-on workshop on latest digital technologies",
      image: "/digital-skills-workshop.jpg",
    },
    {
      id: 3,
      title: "Startup Pitch Competition",
      date: "2025-12-28",
      time: "02:00 PM - 06:00 PM",
      location: "Bangalore",
      category: "entrepreneurship",
      attendees: 300,
      description: "Showcase your startup idea and win prizes",
      image: "/startup-pitch-competition.png",
    },
  ]

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
        <div className="grid gap-6">
          {filtered.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="grid md:grid-cols-3 gap-6 p-6">
                <img
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  className="w-full h-48 object-cover rounded-lg md:col-span-1"
                />
                <div className="md:col-span-2">
                  <h3 className="text-2xl font-bold text-neutral-900 mb-2">{event.title}</h3>
                  <p className="text-neutral-600 mb-4">{event.description}</p>

                  <div className="space-y-2 mb-6 text-sm">
                    <div className="flex items-center gap-2 text-neutral-700">
                      <Calendar className="w-4 h-4" />
                      {new Date(event.date).toLocaleDateString("en-IN")} • {event.time}
                    </div>
                    <div className="flex items-center gap-2 text-neutral-700">
                      <MapPin className="w-4 h-4" />
                      {event.location}
                    </div>
                    <div className="flex items-center gap-2 text-neutral-700">
                      <Users className="w-4 h-4" />
                      {event.attendees} expected participants
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Link
                      href={`/events/${event.id}`}
                      className="px-6 py-2 bg-gov-primary text-white rounded-lg hover:bg-gov-primary-600 transition-colors font-medium"
                    >
                      View Details
                    </Link>
                    <button className="px-6 py-2 border border-gov-primary text-gov-primary rounded-lg hover:bg-neutral-50 transition-colors font-medium">
                      Register Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
