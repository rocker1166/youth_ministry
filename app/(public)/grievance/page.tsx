"use client"

import type React from "react"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { AlertCircle, CheckCircle } from "lucide-react"

export default function GrievancePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    registrationId: "",
    grievanceType: "",
    program: "",
    description: "",
    attachmentNote: "",
  })

  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const grievanceTypes = [
    "Quality of Training",
    "Trainer/Staff Behavior",
    "Course Content",
    "Certificate Issue",
    "Placement Assistance",
    "Fee/Payment Issue",
    "Administrative",
    "Other",
  ]

  const programs = [
    "Leadership Development Program",
    "Digital Skills Certification",
    "Entrepreneurship Bootcamp",
    "Career Advancement Program",
    "Social Impact Initiative",
    "Global Exchange Program",
    "Other",
  ]

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
    if (!formData.grievanceType) newErrors.grievanceType = "Please select grievance type"
    if (!formData.description.trim()) newErrors.description = "Please describe your grievance"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setSubmitted(true)
      setFormData({
        name: "",
        email: "",
        phone: "",
        registrationId: "",
        grievanceType: "",
        program: "",
        description: "",
        attachmentNote: "",
      })
      setTimeout(() => setSubmitted(false), 5000)
    }
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-foreground mb-4">Grievance Portal</h1>
            <p className="text-lg text-muted-foreground text-balance">
              We value your feedback. If you have any concerns or grievances, please submit them here and we will
              address them promptly.
            </p>
          </div>
        </section>

        {/* Grievance Form */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card className="text-center">
                <CardHeader>
                  <div className="flex justify-center mb-2">
                    <AlertCircle className="text-primary" size={32} />
                  </div>
                  <CardTitle className="text-lg">Report Grievance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Submit your concern through our secure grievance portal
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="flex justify-center mb-2">
                    <CheckCircle className="text-accent" size={32} />
                  </div>
                  <CardTitle className="text-lg">Receive Updates</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Get real-time updates on your grievance status</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="flex justify-center mb-2">
                    <CheckCircle className="text-green-600" size={32} />
                  </div>
                  <CardTitle className="text-lg">Resolution</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Quick and fair resolution within 30 days</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Submit Your Grievance</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Your Information</h3>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">Name*</label>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className={errors.name ? "border-red-500" : ""}
                      />
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-foreground">Email*</label>
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          className={errors.email ? "border-red-500" : ""}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-foreground">Phone Number*</label>
                        <Input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91-XXXXXXXXXX"
                          className={errors.phone ? "border-red-500" : ""}
                        />
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Program Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Program Information</h3>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">
                        Program Name (if applicable)
                      </label>
                      <Select value={formData.program} onValueChange={(value) => handleSelectChange("program", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select program" />
                        </SelectTrigger>
                        <SelectContent>
                          {programs.map((program) => (
                            <SelectItem key={program} value={program}>
                              {program}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">
                        Registration/Application ID (if you have one)
                      </label>
                      <Input
                        type="text"
                        name="registrationId"
                        value={formData.registrationId}
                        onChange={handleChange}
                        placeholder="Your registration ID"
                      />
                    </div>
                  </div>

                  {/* Grievance Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Grievance Details</h3>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">Type of Grievance*</label>
                      <Select
                        value={formData.grievanceType}
                        onValueChange={(value) => handleSelectChange("grievanceType", value)}
                      >
                        <SelectTrigger className={errors.grievanceType ? "border-red-500" : ""}>
                          <SelectValue placeholder="Select grievance type" />
                        </SelectTrigger>
                        <SelectContent>
                          {grievanceTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.grievanceType && <p className="text-red-500 text-sm mt-1">{errors.grievanceType}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">Describe Your Grievance*</label>
                      <Textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Please provide detailed information about your grievance..."
                        rows={6}
                        className={errors.description ? "border-red-500" : ""}
                      />
                      {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">
                        Supporting Documents (Optional)
                      </label>
                      <div className="p-4 border-2 border-dashed border-border rounded-lg text-center">
                        <p className="text-sm text-muted-foreground mb-2">
                          You can attach supporting documents after submission
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Maximum file size: 5MB per file, Formats: PDF, JPG, PNG
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Success Message */}
                  {submitted && (
                    <div className="p-4 bg-green-100 border border-green-300 text-green-800 rounded-lg">
                      <p className="font-semibold mb-1">Grievance Submitted Successfully!</p>
                      <p className="text-sm">
                        Your grievance reference number will be sent to your email. Our team will review and respond
                        within 30 days.
                      </p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90">
                    Submit Grievance
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* FAQ Section */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Grievance Process Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Timeline</h4>
                  <p className="text-sm text-muted-foreground">
                    We aim to resolve all grievances within 30 days. You'll receive updates via email.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Confidentiality</h4>
                  <p className="text-sm text-muted-foreground">
                    Your grievance information is treated as confidential and is used only for resolution purposes.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Reference Number</h4>
                  <p className="text-sm text-muted-foreground">
                    A unique reference number will be generated for tracking your grievance status.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
