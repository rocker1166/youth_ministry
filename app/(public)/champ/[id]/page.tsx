"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import {
  Calendar,
  MapPin,
  Users,
  ArrowLeft,
  Download,
  Share2,
  Clock,
  Award,
  Target,
  BookOpen,
  GraduationCap,
  Building2,
  Mail,
  Phone,
  ChevronLeft,
  ChevronRight,
  X,
  Check,
  Sparkles
} from "lucide-react"
import { CAMP_2025 } from "../data"

export default function CampDetailPage() {
  const params = useParams()
  const router = useRouter()
  const campId = params.id as string
  
  const [activeTab, setActiveTab] = useState("overview")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  // For now, we only have one camp
  const camp = campId === CAMP_2025.id ? CAMP_2025 : null

  if (!camp) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-xl text-gray-600 mb-4">Camp not found</p>
          <Link href="/champ" className="text-primary hover:underline">
            ← Back to Camps
          </Link>
        </div>
      </div>
    )
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % camp.brochureImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + camp.brochureImages.length) % camp.brochureImages.length)
  }

  const handleShare = async () => {
    const url = window.location.href
    if (navigator.share) {
      try {
        await navigator.share({
          title: camp.title,
          text: camp.theme,
          url: url,
        })
      } catch (err) {
        console.log("Share cancelled")
      }
    } else {
      navigator.clipboard.writeText(url)
      alert("Link copied to clipboard!")
    }
  }

  const handleDownloadCurrent = () => {
    const link = document.createElement("a")
    link.href = camp.brochureImages[currentImageIndex]
    link.download = `NIC-2025-Brochure-Page-${currentImageIndex + 1}.jpg`
    link.click()
  }

  const handleDownloadAll = () => {
    camp.brochureImages.forEach((img, idx) => {
      const link = document.createElement("a")
      link.href = img
      link.download = `NIC-2025-Brochure-Page-${idx + 1}.jpg`
      setTimeout(() => link.click(), idx * 100)
    })
  }

  const startDate = new Date(camp.startDate)
  const endDate = new Date(camp.endDate)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Lightbox */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="relative max-w-6xl w-full h-[90vh]">
            <Image
              src={camp.brochureImages[currentImageIndex]}
              alt={`Brochure page ${currentImageIndex + 1}`}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link
          href="/champ"
          className="inline-flex items-center gap-2 text-primary hover:underline mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Camps
        </Link>

        {/* Brochure Gallery Section */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-200 dark:border-slate-700">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-primary" />
              Official Brochure
            </h2>
          </div>
          
          <div className="p-6">
            {/* Main Carousel */}
            <div className="relative aspect-[16/10] bg-gray-100 dark:bg-slate-700 rounded-xl overflow-hidden mb-4">
              <Image
                src={camp.brochureImages[currentImageIndex]}
                alt={`Brochure page ${currentImageIndex + 1}`}
                fill
                className="object-contain cursor-pointer"
                onClick={() => setIsLightboxOpen(true)}
              />
              
              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-800 rounded-full shadow-lg transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-800 rounded-full shadow-lg transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Click to expand hint */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
                Click to view fullscreen
              </div>
            </div>

            {/* Thumbnail Dots */}
            <div className="flex justify-center gap-2 mb-6">
              {camp.brochureImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    idx === currentImageIndex
                      ? "bg-primary w-8"
                      : "bg-gray-300 dark:bg-slate-600 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleDownloadCurrent}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download Current Page
              </button>
              <button
                onClick={handleDownloadAll}
                className="flex items-center gap-2 px-4 py-2 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-all"
              >
                <Download className="w-4 h-4" />
                Download All (4 Pages)
              </button>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 border-2 border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Share Camp
              </button>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="relative h-48 bg-gradient-to-r from-orange-500 via-blue-500 to-green-500">
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative h-full flex items-center justify-center text-center px-6">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                  <span className="text-white font-semibold text-sm">{camp.edition}</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {camp.title}
                </h1>
                <p className="text-xl text-white/90 font-semibold">
                  {camp.theme}
                </p>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Organizer Badge */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <Building2 className="w-5 h-5 text-primary" />
              <span className="text-gray-600 dark:text-gray-400">Organized by</span>
              <span className="font-bold text-foreground">{camp.organizer}</span>
            </div>

            {/* Key Details Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-700 dark:to-slate-600 rounded-xl text-center">
                <Calendar className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Duration</p>
                <p className="font-bold text-foreground">
                  {startDate.toLocaleDateString("en-IN", { month: "short", day: "numeric" })} - {endDate.toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">8 Days</p>
              </div>

              <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-700 dark:to-slate-600 rounded-xl text-center">
                <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Location</p>
                <p className="font-bold text-foreground">{camp.location.split(",")[0]}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {camp.location.split(",").slice(1).join(",")}
                </p>
              </div>

              <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-slate-700 dark:to-slate-600 rounded-xl text-center">
                <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Capacity</p>
                <p className="font-bold text-foreground">{camp.capacity}+ Participants</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Expected</p>
              </div>

              <div className="p-4 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-slate-700 dark:to-slate-600 rounded-xl text-center">
                <Award className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Registration</p>
                <p className="font-bold text-green-600 dark:text-green-400">{camp.registrationFee}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Age {camp.eligibility.minAge}-{camp.eligibility.maxAge}
                </p>
              </div>
            </div>

            {/* Registration Info Alert */}
            <div className="bg-gradient-to-r from-primary/10 to-blue-500/10 border-l-4 border-primary rounded-lg p-4">
              <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Registration & Reporting Information
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600 dark:text-gray-400"><strong>Reporting Dates:</strong> {camp.reportingInfo.dates}</p>
                  <p className="text-gray-600 dark:text-gray-400"><strong>Reporting Time:</strong> {camp.reportingInfo.time}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400"><strong>Inaugural Ceremony:</strong></p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {new Date(camp.inauguralCeremony.date).toLocaleDateString("en-IN", { 
                      weekday: "long", 
                      month: "long", 
                      day: "numeric", 
                      year: "numeric" 
                    })} at {camp.inauguralCeremony.time}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg mb-8 overflow-hidden">
          <div className="flex overflow-x-auto border-b border-gray-200 dark:border-slate-700">
            {[
              { id: "overview", label: "Overview", icon: Target },
              { id: "schedule", label: "Daily Schedule", icon: Calendar },
              { id: "training", label: "Training & Workshops", icon: GraduationCap },
              { id: "organizers", label: "Organizers & Leadership", icon: Building2 },
            ].map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-semibold transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? "text-primary border-b-2 border-primary bg-primary/5"
                      : "text-gray-600 dark:text-gray-400 hover:text-primary hover:bg-gray-50 dark:hover:bg-slate-700"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              )
            })}
          </div>

          <div className="p-8">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-8">
                {/* Mission & Vision */}
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <Target className="w-6 h-6 text-primary" />
                    Mission & Vision
                  </h3>
                  <div className="space-y-4 text-gray-700 dark:text-gray-300">
                    <p className="leading-relaxed">{camp.missionVision.history}</p>
                    <p className="leading-relaxed">{camp.missionVision.mission}</p>
                    <p className="leading-relaxed">{camp.missionVision.approach}</p>
                  </div>
                </div>

                {/* Objectives */}
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Aims & Objectives
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {camp.objectives.map((objective, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg hover:shadow-md transition-shadow"
                      >
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-gray-700 dark:text-gray-300">{objective}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Eligibility */}
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Eligibility Criteria
                  </h3>
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-700 dark:to-slate-600 rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      <Users className="w-8 h-8 text-primary flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-foreground mb-2">
                          Age Group: {camp.eligibility.minAge}-{camp.eligibility.maxAge} years
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                          {camp.eligibility.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Achievements */}
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Past Achievements
                  </h3>
                  <div className="bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-slate-700 dark:to-slate-600 rounded-xl p-6">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {camp.missionVision.achievements}
                    </p>
                  </div>
                </div>

                {/* VVIP Guests */}
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Distinguished Guests
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {camp.vvipGuests.map((guest, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-4 bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-lg"
                      >
                        <Award className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-tight">{guest}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Daily Schedule Tab */}
            {activeTab === "schedule" && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Daily Training Schedule
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {camp.trainingPeriod.startDate} to {camp.trainingPeriod.endDate} | {camp.trainingPeriod.timing}
                  </p>
                  <div className="space-y-3">
                    {camp.dailySchedule.map((schedule, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg"
                      >
                        <div className="flex-shrink-0 w-32">
                          <p className="font-semibold text-primary">{schedule.time}</p>
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-700 dark:text-gray-300">{schedule.activity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Events by Date */}
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-6">
                    Seminars, Workshops & Cultural Programmes
                  </h3>
                  <div className="space-y-6">
                    {Object.entries(camp.eventsByDate).map(([date, events]) => (
                      <div key={date} className="border-l-4 border-primary pl-6 py-4">
                        <h4 className="text-xl font-bold text-foreground mb-4">
                          {new Date(date).toLocaleDateString("en-IN", {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </h4>
                        <div className="space-y-3">
                          {events.map((event, idx) => (
                            <div
                              key={idx}
                              className={`flex items-start gap-3 p-4 rounded-lg ${
                                event.type === "ceremony"
                                  ? "bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20"
                                  : event.type === "seminar"
                                  ? "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20"
                                  : event.type === "workshop"
                                  ? "bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20"
                                  : "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20"
                              }`}
                            >
                              <div className="flex-shrink-0">
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${
                                    event.type === "ceremony"
                                      ? "bg-orange-500 text-white"
                                      : event.type === "seminar"
                                      ? "bg-blue-500 text-white"
                                      : event.type === "workshop"
                                      ? "bg-purple-500 text-white"
                                      : "bg-green-500 text-white"
                                  }`}
                                >
                                  {event.type}
                                </span>
                              </div>
                              <div className="flex-1">
                                <p className="font-semibold text-gray-900 dark:text-white">
                                  {event.title}
                                </p>
                                {event.time && (
                                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                    {event.time}
                                  </p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Training & Workshops Tab */}
            {activeTab === "training" && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-6">
                    Training Subjects
                  </h3>
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {camp.trainingSubjects.map((subject) => (
                      <div
                        key={subject}
                        className="flex items-center gap-3 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-700 dark:to-slate-600 rounded-lg hover:shadow-md transition-shadow"
                      >
                        <GraduationCap className="w-6 h-6 text-primary flex-shrink-0" />
                        <p className="font-semibold text-gray-900 dark:text-white">{subject}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-6">
                    Expert Faculties & Resource Persons
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {camp.faculties.map((faculty, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg"
                      >
                        <BookOpen className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-gray-700 dark:text-gray-300">{faculty}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Organizers & Leadership Tab */}
            {activeTab === "organizers" && (
              <div className="space-y-8">
                {/* Cooperating Bodies */}
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-6">
                    In Cooperation With
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {camp.cooperatingBodies.map((body, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-4 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-slate-700 dark:to-slate-600 rounded-lg"
                      >
                        <Building2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{body}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chief Advisor */}
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Chief Advisor
                  </h3>
                  <div className="bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-xl p-6">
                    <p className="font-bold text-xl text-foreground">{camp.chiefAdvisor.name}</p>
                    <p className="text-gray-600 dark:text-gray-400">{camp.chiefAdvisor.title}</p>
                  </div>
                </div>

                {/* Advisors */}
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-6">
                    Advisors
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {camp.advisors.map((advisor, idx) => (
                      <div key={idx} className="p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                        <p className="font-semibold text-gray-900 dark:text-white">{advisor.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{advisor.title}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Leadership */}
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-6">
                    Leadership
                  </h3>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-700 dark:to-slate-600 rounded-xl">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">President (Camp)</p>
                        <p className="font-bold text-lg text-foreground">{camp.leadership.president.name}</p>
                      </div>
                      <div className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-700 dark:to-slate-600 rounded-xl">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">President (Organization)</p>
                        <p className="font-bold text-lg text-foreground">{camp.leadership.organizationPresident.name}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{camp.leadership.organizationPresident.title}</p>
                      </div>
                      <div className="p-5 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-700 dark:to-slate-600 rounded-xl">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Vice President</p>
                        <p className="font-bold text-lg text-foreground">{camp.leadership.vicePresident.name}</p>
                      </div>
                      <div className="p-5 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-700 dark:to-slate-600 rounded-xl">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">General Secretary</p>
                        <p className="font-bold text-lg text-foreground">{camp.leadership.generalSecretary.name}</p>
                      </div>
                      <div className="p-5 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-slate-700 dark:to-slate-600 rounded-xl">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Treasurer</p>
                        <p className="font-bold text-lg text-foreground">{camp.leadership.treasurer.name}</p>
                      </div>
                      <div className="p-5 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-slate-700 dark:to-slate-600 rounded-xl">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Additional General Secretary</p>
                        <p className="font-bold text-lg text-foreground">{camp.leadership.additionalGeneralSecretary.name}</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Secretary (Culture)</p>
                        <p className="font-semibold text-foreground">{camp.leadership.secretaries.culture.name}</p>
                      </div>
                      <div className="p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Secretary (Training)</p>
                        <p className="font-semibold text-foreground">{camp.leadership.secretaries.training.name}</p>
                      </div>
                      <div className="p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Secretary (Science)</p>
                        <p className="font-semibold text-foreground">{camp.leadership.secretaries.science.name}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Coordinators */}
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-6">
                    Coordinators
                  </h3>
                  <div className="space-y-3">
                    <div className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-slate-700 dark:to-slate-600 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Main Coordinator</p>
                      <p className="font-bold text-foreground">{camp.coordinators.main.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{camp.coordinators.main.title}</p>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-slate-700 dark:to-slate-600 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Joint Coordinator</p>
                      <p className="font-bold text-foreground">{camp.coordinators.joint.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{camp.coordinators.joint.title}</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      {camp.coordinators.deputy.map((deputy, idx) => (
                        <div key={idx} className="p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                          <p className="text-sm text-gray-600 dark:text-gray-400">Deputy Coordinator</p>
                          <p className="font-semibold text-foreground">{deputy.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{deputy.title}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Camp Executives */}
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-6">
                    Camp Executives
                  </h3>
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {camp.campExecutives.map((executive, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg text-center"
                      >
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{executive}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-6">
                    Contact Information
                  </h3>
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-700 dark:to-slate-600 rounded-xl p-6">
                    <p className="font-bold text-lg text-foreground mb-4">
                      {camp.organizerDetails.name}
                    </p>
                    <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      {camp.organizerDetails.registrations.map((reg, idx) => (
                        <p key={idx} className="text-xs">{reg}</p>
                      ))}
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        <p className="text-sm text-gray-700 dark:text-gray-300">{camp.organizerDetails.address}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-primary" />
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {camp.organizerDetails.phone} | {camp.organizerDetails.mobile}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-primary" />
                        <a
                          href={`mailto:${camp.organizerDetails.email}`}
                          className="text-sm text-primary hover:underline"
                        >
                          {camp.organizerDetails.email}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sticky CTA Section (at bottom when scrolling) */}
        <div className="sticky bottom-0 bg-white dark:bg-slate-800 border-t-2 border-primary rounded-t-2xl shadow-2xl p-6">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-foreground">
                Ready to Join the Camp?
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Registration opens soon. Don't miss this opportunity!
              </p>
            </div>
            <div className="flex gap-3">
              <button className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2 animate-pulse">
                <Award className="w-5 h-5" />
                Register for Camp
              </button>
              <button
                onClick={handleDownloadAll}
                className="px-6 py-3 border-2 border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
              >
                <Download className="w-5 h-5 inline mr-2" />
                Download Brochure
              </button>
            </div>
          </div>
        </div>

        {/* Floating Share Button */}
        <button
          onClick={handleShare}
          className="fixed right-6 bottom-24 p-4 bg-primary text-white rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110 z-40"
          aria-label="Share this camp"
        >
          <Share2 className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}
