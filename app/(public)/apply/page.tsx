"use client"

import type React from "react"

import { Navigation } from "@/app/components/navigation"
import { Footer } from "@/app/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Textarea } from "@/app/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { Checkbox } from "@/app/components/ui/checkbox"
import { useState } from "react"
import { AlertCircle } from "lucide-react"

export default function ApplyPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    state: "",
    city: "",
    education: "",
    currentOccupation: "",
    program: "",
    experienceLevel: "",
    motivation: "",
    agreeTerms: false,
  })

  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const programs = [
    "Leadership Development Program",
    "Digital Skills Certification",
    "Entrepreneurship Bootcamp",
    "Career Advancement Program",
    "Social Impact Initiative",
    "Global Exchange Program",
  ]

  const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Delhi",
  ]

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required"
    if (!formData.gender) newErrors.gender = "Please select gender"
    if (!formData.state) newErrors.state = "Please select state"
    if (!formData.city.trim()) newErrors.city = "City is required"
    if (!formData.education) newErrors.education = "Please select education level"
    if (!formData.program) newErrors.program = "Please select a program"
    if (!formData.experienceLevel) newErrors.experienceLevel = "Please select experience level"
    if (!formData.motivation.trim()) newErrors.motivation = "Please tell us your motivation"
    if (!formData.agreeTerms) newErrors.agreeTerms = "You must agree to terms and conditions"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
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
        fullName: "",
        email: "",
        phone: "",
        dateOfBirth: "",
        gender: "",
        state: "",
        city: "",
        education: "",
        currentOccupation: "",
        program: "",
        experienceLevel: "",
        motivation: "",
        agreeTerms: false,
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
            <h1 className="text-5xl font-bold text-foreground mb-4">Apply for Our Programs</h1>
            <p className="text-lg text-muted-foreground text-balance">
              Join thousands of youth transforming their futures through our comprehensive development programs
            </p>
          </div>
        </section>

        {/* Application Form */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Program Application Form</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Personal Information Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">Full Name*</label>
                      <Input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className={errors.fullName ? "border-red-500" : ""}
                      />
                      {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
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

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-foreground">Date of Birth*</label>
                        <Input
                          type="date"
                          name="dateOfBirth"
                          value={formData.dateOfBirth}
                          onChange={handleChange}
                          className={errors.dateOfBirth ? "border-red-500" : ""}
                        />
                        {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-foreground">Gender*</label>
                        <Select value={formData.gender} onValueChange={(value) => handleSelectChange("gender", value)}>
                          <SelectTrigger className={errors.gender ? "border-red-500" : ""}>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                            <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Location Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Location</h3>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-foreground">State*</label>
                        <Select value={formData.state} onValueChange={(value) => handleSelectChange("state", value)}>
                          <SelectTrigger className={errors.state ? "border-red-500" : ""}>
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            {states.map((state) => (
                              <SelectItem key={state} value={state}>
                                {state}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-foreground">City*</label>
                        <Input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          placeholder="Your city"
                          className={errors.city ? "border-red-500" : ""}
                        />
                        {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Education & Background */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Education & Background</h3>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">Education Level*</label>
                      <Select
                        value={formData.education}
                        onValueChange={(value) => handleSelectChange("education", value)}
                      >
                        <SelectTrigger className={errors.education ? "border-red-500" : ""}>
                          <SelectValue placeholder="Select education level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="highschool">High School</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="diploma">Diploma</SelectItem>
                          <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                          <SelectItem value="master">Master's Degree</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.education && <p className="text-red-500 text-sm mt-1">{errors.education}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">Current Occupation</label>
                      <Input
                        type="text"
                        name="currentOccupation"
                        value={formData.currentOccupation}
                        onChange={handleChange}
                        placeholder="Student, Employed, Self-employed, etc."
                      />
                    </div>
                  </div>

                  {/* Program Selection */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Program Selection</h3>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">
                        Program You're Applying For*
                      </label>
                      <Select value={formData.program} onValueChange={(value) => handleSelectChange("program", value)}>
                        <SelectTrigger className={errors.program ? "border-red-500" : ""}>
                          <SelectValue placeholder="Select a program" />
                        </SelectTrigger>
                        <SelectContent>
                          {programs.map((program) => (
                            <SelectItem key={program} value={program}>
                              {program}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.program && <p className="text-red-500 text-sm mt-1">{errors.program}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">Experience Level*</label>
                      <Select
                        value={formData.experienceLevel}
                        onValueChange={(value) => handleSelectChange("experienceLevel", value)}
                      >
                        <SelectTrigger className={errors.experienceLevel ? "border-red-500" : ""}>
                          <SelectValue placeholder="Select experience level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.experienceLevel && <p className="text-red-500 text-sm mt-1">{errors.experienceLevel}</p>}
                    </div>
                  </div>

                  {/* Motivation */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">
                        Why do you want to join this program?*
                      </label>
                      <Textarea
                        name="motivation"
                        value={formData.motivation}
                        onChange={handleChange}
                        placeholder="Tell us about your goals and motivation..."
                        rows={5}
                        className={errors.motivation ? "border-red-500" : ""}
                      />
                      {errors.motivation && <p className="text-red-500 text-sm mt-1">{errors.motivation}</p>}
                    </div>
                  </div>

                  {/* Terms & Conditions */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="terms"
                        checked={formData.agreeTerms}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({ ...prev, agreeTerms: checked as boolean }))
                        }
                      />
                      <label htmlFor="terms" className="text-sm text-foreground/80 cursor-pointer">
                        I agree to the terms and conditions and privacy policy of the Institute of Youth Affairs*
                      </label>
                    </div>
                    {errors.agreeTerms && <p className="text-red-500 text-sm">{errors.agreeTerms}</p>}
                  </div>

                  {/* Success Message */}
                  {submitted && (
                    <div className="p-4 bg-green-100 border border-green-300 text-green-800 rounded-lg flex items-start gap-3">
                      <AlertCircle size={20} className="mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">Application Submitted Successfully!</p>
                        <p className="text-sm mt-1">
                          We've received your application. You'll hear from us within 7-10 business days.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90">
                    Submit Application
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Important Notes */}
            <Card className="mt-8 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
              <CardHeader>
                <CardTitle className="text-lg text-blue-900 dark:text-blue-100">Important Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-blue-900 dark:text-blue-100">
                <p>• All fields marked with * are mandatory</p>
                <p>• Ensure you provide accurate information</p>
                <p>• We may verify your details through official channels</p>
                <p>• Selection is based on merit and program requirements</p>
                <p>• Selected candidates will be notified via email and phone</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
