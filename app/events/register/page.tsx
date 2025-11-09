"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Alert } from "@/components/ui/alert"
import { CheckCircle2, AlertCircle } from "lucide-react"

export default function EventRegistration() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    event_id: new URLSearchParams(typeof window !== "undefined" ? window.location.search : "").get("event") || "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Registration failed")
      }

      const data = await response.json()
      setSuccess(true)
      setStep(3)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-100 to-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="flex justify-between mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`h-2 flex-1 mx-2 rounded ${s <= step ? "bg-primary" : "bg-neutral-200"}`} />
          ))}
        </div>

        {/* Step 1: Personal Information */}
        {step === 1 && (
          <Card className="p-8">
            <h1 className="text-3xl font-bold text-primary mb-6">Event Registration</h1>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
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
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91-XXXXXXXXXX"
                  required
                />
              </div>
              <Button type="button" onClick={() => setStep(2)} className="w-full bg-primary hover:bg-primary-600">
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
            <CheckCircle2 className="h-16 w-16 text-success mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-primary mb-4">Registration Successful!</h2>
            <p className="text-neutral-600 mb-4">
              Thank you for registering. A confirmation has been sent to <strong>{formData.email}</strong>
            </p>
            <p className="text-sm text-neutral-500 mb-6">
              You'll receive a confirmation PDF shortly. Please check your email for event details and updates.
            </p>
            <Button onClick={() => (window.location.href = "/events")} className="bg-primary hover:bg-primary-600">
              Back to Events
            </Button>
          </Card>
        )}
      </div>
    </div>
  )
}
