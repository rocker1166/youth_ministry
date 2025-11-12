"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Send, MapPin, Phone, Mail, Clock, Shield, CheckCircle } from "lucide-react"
import { useState } from "react"

export function CTA() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true)
      setFormData({ name: "", email: "", subject: "", message: "" })
      setTimeout(() => setSubmitted(false), 3000)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-primary via-primary-600 to-accent overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-6 border-2 border-white/30">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Get in Touch with Us
          </h2>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-1 w-16 bg-white/40 rounded-full" />
            <div className="h-1 w-8 bg-white/60 rounded-full" />
            <div className="h-1 w-16 bg-white/40 rounded-full" />
          </div>
          <p className="text-lg text-white/90 max-w-3xl mx-auto leading-relaxed">
            Have questions or want to learn more about our programs? We're here to help you shape India's future.
            <br />
            <span className="text-white/80 text-base">Connect with us through the form or visit our office.</span>
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-stretch">
          {/* Left: Map and Contact Info */}
          <div className="flex flex-col space-y-6">
            {/* Map Container */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/30 bg-white/10 backdrop-blur-sm shrink-0">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d235456.04531125753!2d88.378141!3d22.765355!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89c7b4766e60d%3A0xa767c9f549439aa3!2sCentral%20Calcutta%20Science%20%26%20Cultural%20Organisation%20for%20Youth!5e0!3m2!1sen!2sus!4v1762682101097!5m2!1sen!2sus"
                width="100%"
                height="360"
                className="border-0"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                title="Institute of Youth Affairs Office Location"
              />
              {/* Map Badge */}
              <div className="absolute top-5 left-5 bg-white px-4 py-2.5 rounded-full shadow-xl flex items-center gap-2.5 border-2 border-primary/20">
                <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-bold text-gray-900">Our Office Location</span>
              </div>
            </div>

            {/* Contact Information Cards - Improved Symmetry */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
              <div className="bg-white/15 backdrop-blur-md border-2 border-white/30 rounded-xl p-5 hover:bg-white/20 transition-all duration-300 shadow-lg h-full">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/25 rounded-xl flex items-center justify-center shrink-0 shadow-inner">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-white text-sm mb-1.5 tracking-wide">ADDRESS</p>
                    <p className="text-white/90 text-sm leading-relaxed">
                      Kolkata, West Bengal
                      <br />
                      India
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/15 backdrop-blur-md border-2 border-white/30 rounded-xl p-5 hover:bg-white/20 transition-all duration-300 shadow-lg h-full">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/25 rounded-xl flex items-center justify-center shrink-0 shadow-inner">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-white text-sm mb-1.5 tracking-wide">PHONE</p>
                    <p className="text-white/90 text-sm leading-relaxed">
                      +91-11-XXXX-XXXX
                      <br />
                      Mon-Sat 9AM-6PM
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/15 backdrop-blur-md border-2 border-white/30 rounded-xl p-5 hover:bg-white/20 transition-all duration-300 shadow-lg h-full">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/25 rounded-xl flex items-center justify-center shrink-0 shadow-inner">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-white text-sm mb-1.5 tracking-wide">EMAIL</p>
                    <p className="text-white/90 text-sm leading-relaxed break-all">
                      youthaffairs14@gmail.com
                      <br />
                      support@iya.gov.in
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/15 backdrop-blur-md border-2 border-white/30 rounded-xl p-5 hover:bg-white/20 transition-all duration-300 shadow-lg h-full">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/25 rounded-xl flex items-center justify-center shrink-0 shadow-inner">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-white text-sm mb-1.5 tracking-wide">HOURS</p>
                    <p className="text-white/90 text-sm leading-relaxed">
                      Mon-Fri: 9AM-6PM
                      <br />
                      Sat: 9AM-1PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Info Banner */}
            <div className="bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-xl p-5 text-center shrink-0">
              <p className="text-white/90 text-sm leading-relaxed">
                <span className="font-bold text-white">Government of India Initiative</span>
                <br />
                Ministry of Youth Affairs & Sports
              </p>
            </div>
          </div>

          {/* Right: Contact Form - Improved Design */}
          <div className="bg-white rounded-2xl shadow-2xl border-4 border-white/30">
            {/* Form Header */}
            <div className="bg-linear-to-br from-primary/5 to-accent/5 px-8 py-6 border-b-2 border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Send className="w-5 h-5 text-primary" />
                </div>
                Send Us a Message
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Fill out the form below and our team will get back to you within 24 hours.
              </p>
            </div>

            {/* Form Body */}
            <div className="px-8 py-6">
              {submitted && (
                <div className="mb-6 p-4 bg-green-50 border-2 border-green-200 rounded-xl flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-green-900 text-sm font-bold mb-1">Message Sent Successfully!</p>
                    <p className="text-green-700 text-xs">
                      Thank you for contacting us. We'll respond to your query shortly.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2 tracking-wide">
                    FULL NAME <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    className="h-12 border-2 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg text-base"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2 tracking-wide">
                    EMAIL ADDRESS <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="h-12 border-2 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg text-base"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2 tracking-wide">
                    SUBJECT
                  </label>
                  <Input
                    type="text"
                    name="subject"
                    placeholder="What is this regarding?"
                    value={formData.subject}
                    onChange={handleChange}
                    className="h-12 border-2 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2 tracking-wide">
                    MESSAGE <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    name="message"
                    placeholder="Tell us more about your query or feedback..."
                    value={formData.message}
                    onChange={handleChange}
                    className="min-h-[130px] border-2 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none rounded-lg text-base leading-relaxed"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-13 bg-primary hover:bg-primary-600 text-base font-bold shadow-xl hover:shadow-2xl transition-all duration-300 gap-3 rounded-lg"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </Button>
              </form>
            </div>

            {/* Form Footer */}
            <div className="px-8 py-5 bg-gray-50 border-t-2 border-gray-100 rounded-b-2xl">
              <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
                <Shield className="w-4 h-4 text-primary" />
                <span>
                  By submitting this form, you agree to our{" "}
                  <span className="font-semibold text-primary">privacy policy</span> and{" "}
                  <span className="font-semibold text-primary">terms of service</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
