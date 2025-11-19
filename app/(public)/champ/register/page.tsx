"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Alert } from "@/components/ui/alert"
import { CheckCircle2, AlertCircle, Calendar, MapPin, Clock } from "lucide-react"
import Link from "next/link"

interface Event {
  id: string
  title: string
  start_date: string
  end_date: string
  location: string
  category: string
}

export default function EventRegistration() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const [event, setEvent] = useState<Event | null>(null)
  const [referenceNumber, setReferenceNumber] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    event_id: "",
    message: "",
  })

  // Get event_id from URL on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search)
      const eventId = urlParams.get("event")
      if (eventId) {
        setFormData((prev) => ({ ...prev, event_id: eventId }))
      }
    }
  }, [])

  useEffect(() => {
    const fetchEvent = async () => {
      if (formData.event_id) {
        try {
          const response = await fetch(`/api/events/${formData.event_id}`)
          if (response.ok) {
            const data = await response.json()
            setEvent(data)
          }
        } catch (err) {
          console.error("Failed to fetch event details", err)
        }
      }
    }
    fetchEvent()
  }, [formData.event_id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Validate event_id
    if (!formData.event_id || formData.event_id.trim() === "") {
      setError("Event ID is missing. Please select an event from the events page.")
      setLoading(false)
      return
    }

    try {
      const response = await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData), // Send formData without user_id
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Registration failed")
      }

      const data = await response.json()
      setReferenceNumber(data.reference_number || `REG-${Date.now()}`)
      setSuccess(true)
      setStep(3)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const validateStep1 = () => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setError("Please fill in all required fields")
      return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email address")
      return false
    }
    setError("")
    return true
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-neutral-100 to-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* No Event Warning */}
        {!event && !loading && formData.event_id === "" && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <div>
              <p className="font-semibold">No Event Selected</p>
              <p className="text-sm">Please select an event from the events page to register.</p>
              <Link href="/events" className="text-sm underline mt-2 inline-block">
                Go to Events Page
              </Link>
            </div>
          </Alert>
        )}

        {/* Event Info Card */}
        {event && (
          <Card className="p-6 mb-8 bg-white border-primary/20">
            <h2 className="text-xl font-bold text-primary mb-4">Registering for:</h2>
            <h3 className="text-2xl font-bold text-neutral-900 mb-4">{event.title}</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2 text-neutral-700">
                <Calendar className="w-4 h-4 text-primary" />
                <span>{new Date(event.start_date).toLocaleDateString("en-IN")}</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-700">
                <Clock className="w-4 h-4 text-primary" />
                <span>
                  {new Date(event.start_date).toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2 text-neutral-700">
                <MapPin className="w-4 h-4 text-primary" />
                <span>{event.location}</span>
              </div>
            </div>
          </Card>
        )}

        {/* Progress Bar */}
        <div className="flex justify-between mb-8">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-2 flex-1 mx-2 rounded transition-colors ${s <= step ? "bg-primary" : "bg-neutral-200"}`}
            />
          ))}
        </div>

        {/* Step 1: Personal Information */}
        {step === 1 && (
          <Card className="p-8">
            <h1 className="text-3xl font-bold text-primary mb-2">Event Registration</h1>
            <p className="text-neutral-600 mb-6">Please provide your personal information</p>

            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </Alert>
            )}

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91-XXXXXXXXXX"
                  required
                />
              </div>
              <Button
                type="button"
                onClick={() => {
                  if (validateStep1()) setStep(2)
                }}
                className="w-full bg-primary hover:bg-primary-600"
              >
                Next: Additional Information
              </Button>
            </form>
          </Card>
        )}

        {/* Step 2: Additional Information */}
        {step === 2 && (
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-primary mb-6">Additional Information</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Why are you interested in this event?</label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us why you'd like to attend this event..."
                  rows={4}
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <span>{error}</span>
                </Alert>
              )}

              <div className="flex gap-4">
                <Button type="button" onClick={() => setStep(1)} variant="outline" className="flex-1">
                  Back
                </Button>
                <Button onClick={handleSubmit} disabled={loading} className="flex-1 bg-primary hover:bg-primary-600">
                  {loading ? "Processing..." : "Complete Registration"}
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && success && (
          <Card className="p-8 text-center">
            <CheckCircle2 className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-primary mb-4">Registration Successful!</h2>
            
            {referenceNumber && (
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-4">
                <p className="text-sm text-neutral-600 mb-1">Your Registration Number</p>
                <p className="text-2xl font-bold text-primary">{referenceNumber}</p>
              </div>
            )}

            <p className="text-neutral-600 mb-2">
              Thank you for registering, <strong>{formData.name}</strong>!
            </p>
            <p className="text-neutral-600 mb-6">
              A confirmation has been sent to <strong>{formData.email}</strong>
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-sm text-left">
              <h3 className="font-semibold text-blue-900 mb-2">What's Next?</h3>
              <ul className="space-y-1 text-blue-800">
                <li>✓ Check your email for confirmation details</li>
                <li>✓ Save your registration number for future reference</li>
                <li>✓ You'll receive event reminders before the date</li>
                <li>✓ A PDF confirmation will be attached to your email</li>
              </ul>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={() => (window.location.href = "/events")}
                variant="outline"
                className="flex-1 border-primary text-primary hover:bg-primary/10"
              >
                Browse More Events
              </Button>
              <Button onClick={() => (window.location.href = "/")} className="flex-1 bg-primary hover:bg-primary-600">
                Back to Home
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
