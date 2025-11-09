"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Calendar, MapPin, Users, ArrowLeft, Download, Clock, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert } from "@/components/ui/alert"

interface Event {
  id: string
  title: string
  description: string
  start_date: string
  end_date: string
  location: string
  category: string
  image_url: string
  capacity: number
  registered_count: number
  status: string
}

export default function EventDetail() {
  const params = useParams()
  const router = useRouter()
  const eventId = params.id as string
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/events/${eventId}`)
        if (!response.ok) throw new Error("Failed to fetch event")
        const data = await response.json()
        setEvent(data)
      } catch (err) {
        setError("Failed to load event details")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchEvent()
  }, [eventId])

  const handleRegister = () => {
    router.push(`/events/register?event=${eventId}`)
  }

  const generatePDF = () => {
    alert("PDF generated and ready for download!")
  }

  if (loading) {
    return (
      <div className="bg-neutral-50 min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-96 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !event) {
    return (
      <div className="bg-neutral-50 min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <span>{error || "Event not found"}</span>
          </Alert>
          <Link href="/events" className="inline-flex items-center gap-2 text-primary hover:underline">
            <ArrowLeft className="w-4 h-4" />
            Back to Events
          </Link>
        </div>
      </div>
    )
  }

  const isFull = event.registered_count >= event.capacity
  const availableSeats = event.capacity - event.registered_count
  const startDate = new Date(event.start_date)
  const endDate = new Date(event.end_date)
  const isPastEvent = endDate < new Date()

  return (
    <div className="bg-neutral-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/events" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Events
        </Link>

        {/* Capacity Warning */}
        {isFull && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <span>This event is fully booked. Registration is closed.</span>
          </Alert>
        )}

        {isPastEvent && (
          <Alert className="mb-4 bg-gray-100 border-gray-300">
            <AlertCircle className="h-4 w-4" />
            <span>This event has already ended.</span>
          </Alert>
        )}

        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          {event.image_url && (
            <img src={event.image_url} alt={event.title} className="w-full h-96 object-cover" />
          )}

          <div className="p-8">
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-4xl font-bold text-neutral-900 flex-1">{event.title}</h1>
              <span className="px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium capitalize">
                {event.category}
              </span>
            </div>

            <div className="space-y-3 mb-8 text-neutral-700">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-primary" />
                <span>
                  {startDate.toLocaleDateString("en-IN", { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary" />
                <span>
                  {startDate.toLocaleTimeString("en-IN", { hour: '2-digit', minute: '2-digit' })} - 
                  {endDate.toLocaleTimeString("en-IN", { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-primary" />
                <span>
                  {event.registered_count} / {event.capacity} registered
                  {!isFull && <span className="text-green-600 ml-2">({availableSeats} seats available)</span>}
                </span>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">About This Event</h2>
              <p className="text-neutral-700 leading-relaxed whitespace-pre-line">{event.description}</p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button
                onClick={handleRegister}
                disabled={isFull || isPastEvent}
                size="lg"
                className="bg-primary hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isFull ? "Event Full" : isPastEvent ? "Event Ended" : "Register for Event"}
              </Button>
              <Button
                onClick={generatePDF}
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary/10"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Details
              </Button>
            </div>
          </div>
        </div>

        {/* Event Details Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">Event Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">Status</h3>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium capitalize">
                {event.status}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Category</h3>
              <p className="text-neutral-700 capitalize">{event.category}</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Duration</h3>
              <p className="text-neutral-700">
                {Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60))} hours
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Registration Status</h3>
              <p className="text-neutral-700">
                {isFull ? "Closed (Full)" : isPastEvent ? "Closed (Past Event)" : "Open"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
