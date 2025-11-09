"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight } from "lucide-react"
import { useState } from "react"

export function CTA() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail("")
      setTimeout(() => setSubmitted(false), 3000)
    }
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary to-accent">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <h2 className="text-4xl md:text-5xl font-bold text-white">Join Us in Shaping India's Future</h2>
        <p className="text-lg text-white/90 text-balance">
          Be part of a movement dedicated to empowering millions of young Indians. Subscribe to stay updated with new
          programs and opportunities.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white/10 border-white/30 text-white placeholder:text-white/60"
          />
          <Button type="submit" size="lg" className="bg-white text-primary hover:bg-white/90 whitespace-nowrap gap-2">
            Subscribe <ArrowRight size={20} />
          </Button>
        </form>

        {submitted && (
          <p className="text-white text-sm animate-in fade-in">
            Thank you for subscribing! Check your email for confirmation.
          </p>
        )}

        <div className="grid grid-cols-3 gap-4 text-white pt-8 border-t border-white/20">
          <div>
            <p className="text-3xl font-bold">24/7</p>
            <p className="text-white/80 text-sm">Support Available</p>
          </div>
          <div>
            <p className="text-3xl font-bold">100%</p>
            <p className="text-white/80 text-sm">Free Programs</p>
          </div>
          <div>
            <p className="text-3xl font-bold">∞</p>
            <p className="text-white/80 text-sm">Opportunities</p>
          </div>
        </div>
      </div>
    </section>
  )
}
