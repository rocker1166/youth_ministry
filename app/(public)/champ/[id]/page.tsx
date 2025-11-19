"use client"

import { useState, Suspense } from "react"
import { useParams } from "next/navigation"
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
  Sparkles,
  ChevronDown,
  ChevronUp
} from "lucide-react"
import { CAMP_2025 } from "../data"
import { useToast } from "@/components/ToastProvider"
import { CampSkeleton } from "@/components/CampSkeleton"

function CampDetailContent() {
  const params = useParams()
  const campId = params.id as string
  const { showToast } = useToast()
  
  const [activeTab, setActiveTab] = useState("overview")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  
  // Expand/collapse states
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    mission: false,
    objectives: false,
    advisors: false,
    executives: false,
    eligibility: false
  })

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

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % camp.brochureImages.length)
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + camp.brochureImages.length) % camp.brochureImages.length)

  const handleShare = async () => {
    const url = window.location.href
    if (navigator.share) {
      try {
        await navigator.share({ title: camp.title, text: camp.theme, url })
        showToast("Camp shared successfully!", "success")
      } catch (err) {
        console.log("Share cancelled")
      }
    } else {
      navigator.clipboard.writeText(url)
      showToast("Link copied to clipboard!", "success")
    }
  }

  const handleDownloadCurrent = async () => {
    setIsDownloading(true)
    showToast("Downloading brochure PDF...", "info", 2000)
    
    setTimeout(() => {
      const link = document.createElement("a")
      link.href = camp.brochurePDF
      link.download = "NIC-2025-Brochure.pdf"
      link.click()
      setIsDownloading(false)
      showToast("Brochure PDF downloaded successfully!", "success")
    }, 500)
  }

  const handleDownloadAll = async () => {
    // Same as handleDownloadCurrent since we only have one PDF
    handleDownloadCurrent()
  }

  const startDate = new Date(camp.startDate)
  const endDate = new Date(camp.endDate)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Lightbox */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 animate-in fade-in duration-300" onClick={() => setIsLightboxOpen(false)}>
          <button onClick={() => setIsLightboxOpen(false)} className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
          <div className="relative max-w-6xl w-full h-[90vh]">
            <Image src={camp.brochureImages[currentImageIndex]} alt={`Brochure page ${currentImageIndex + 1}`} fill className="object-contain" />
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Compact Header */}
        <div className="flex items-center justify-between mb-4">
          <Link href="/champ" className="inline-flex items-center gap-2 text-primary hover:underline text-sm transition-all hover:gap-3">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <div className="flex items-center gap-2">
            <button 
              onClick={handleShare} 
              className="p-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-lg hover:bg-white dark:hover:bg-slate-800 transition-all shadow-sm hover:shadow-md text-sm"
              title="Share camp"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button 
              onClick={handleDownloadAll}
              disabled={isDownloading}
              className="px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all shadow-md hover:shadow-lg disabled:opacity-50 text-sm flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              {isDownloading ? "Downloading..." : "Download PDF"}
            </button>
          </div>
        </div>

        {/* Main Content Grid with Glassmorphic Sidebar */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Left: Sticky Brochure Carousel with Glassmorphism */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-xl shadow-xl overflow-hidden sticky top-6 border border-white/20">
              <div className="relative aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-700 dark:to-slate-600">
                <Image
                  src={camp.brochureImages[currentImageIndex]}
                  alt={`Brochure ${currentImageIndex + 1}`}
                  fill
                  className="object-contain cursor-pointer transition-transform hover:scale-105 duration-300"
                  onClick={() => setIsLightboxOpen(true)}
                />
                <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full shadow-lg hover:scale-110 transition-transform">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full shadow-lg hover:scale-110 transition-transform">
                  <ChevronRight className="w-4 h-4" />
                </button>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs">
                  {currentImageIndex + 1} / {camp.brochureImages.length}
                </div>
              </div>
              <div className="p-3 bg-white/50 dark:bg-slate-800/50 backdrop-blur-md">
                <div className="flex gap-1 justify-center mb-2">
                  {camp.brochureImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`h-2 rounded-full transition-all ${idx === currentImageIndex ? "bg-primary w-6" : "bg-gray-300 dark:bg-slate-600 w-2 hover:bg-gray-400"}`}
                    />
                  ))}
                </div>
                <button 
                  onClick={handleDownloadCurrent}
                  disabled={isDownloading}
                  className="w-full px-3 py-2 text-xs border border-gray-300 dark:border-slate-600 rounded-lg hover:bg-white dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Download className="w-3 h-3" />
                  {isDownloading ? "Downloading..." : "Download PDF Brochure"}
                </button>
              </div>
            </div>
          </div>

          {/* Right: Compact Info */}
          <div className="lg:col-span-2 space-y-4">
            {/* Title Card with Glassmorphism */}
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-xl shadow-xl p-5 border border-white/20">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-green-100 dark:from-orange-900/30 dark:to-green-900/30 px-2.5 py-1 rounded-full mb-2">
                    <Sparkles className="w-3 h-3 text-orange-600 animate-pulse" />
                    <span className="text-xs font-bold text-orange-700 dark:text-orange-300">{camp.edition}</span>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1">{camp.title}</h1>
                  <p className="text-base text-primary font-semibold">{camp.theme}</p>
                </div>
              </div>
              
              {/* Key Stats - Compact Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-700/50 dark:to-slate-600/50 rounded-lg backdrop-blur-sm">
                  <Calendar className="w-5 h-5 text-primary mx-auto mb-1" />
                  <p className="text-xs text-gray-600 dark:text-gray-400">Duration</p>
                  <p className="font-bold text-sm text-foreground">Dec 24-31</p>
                </div>
                <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-700/50 dark:to-slate-600/50 rounded-lg backdrop-blur-sm">
                  <MapPin className="w-5 h-5 text-primary mx-auto mb-1" />
                  <p className="text-xs text-gray-600 dark:text-gray-400">Location</p>
                  <p className="font-bold text-sm text-foreground">Assam Univ</p>
                </div>
                <div className="text-center p-3 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-slate-700/50 dark:to-slate-600/50 rounded-lg backdrop-blur-sm">
                  <Users className="w-5 h-5 text-primary mx-auto mb-1" />
                  <p className="text-xs text-gray-600 dark:text-gray-400">Capacity</p>
                  <p className="font-bold text-sm text-foreground">500+</p>
                </div>
                <div className="text-center p-3 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-slate-700/50 dark:to-slate-600/50 rounded-lg backdrop-blur-sm">
                  <Award className="w-5 h-5 text-primary mx-auto mb-1" />
                  <p className="text-xs text-gray-600 dark:text-gray-400">Fee</p>
                  <p className="font-bold text-sm text-green-600">Free</p>
                </div>
              </div>

              {/* Registration Alert - Compact */}
              <div className="mt-4 bg-gradient-to-r from-primary/10 to-blue-500/10 border-l-4 border-primary rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-gray-700 dark:text-gray-300">
                    <p><strong>Reporting:</strong> {camp.reportingInfo.dates}, {camp.reportingInfo.time}</p>
                    <p><strong>Inaugural:</strong> {new Date(camp.inauguralCeremony.date).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}, {camp.inauguralCeremony.time}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2">
              <button className="flex-1 px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all shadow-md hover:shadow-lg font-semibold flex items-center justify-center gap-2 transform hover:scale-[1.02]">
                <Award className="w-4 h-4" />
                Register Now
              </button>
              <button onClick={() => setActiveTab("organizers")} className="px-4 py-3 border-2 border-gray-300 dark:border-slate-600 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-all font-semibold flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Contact
              </button>
            </div>
          </div>
        </div>

        {/* Tabs with Glassmorphism */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-xl shadow-xl overflow-hidden border border-white/20">
          {/* Tab Navigation */}
          <div className="flex overflow-x-auto border-b border-gray-200/50 dark:border-slate-700/50 scrollbar-hide bg-white/50 dark:bg-slate-800/50 backdrop-blur-md">
            {[
              { id: "overview", label: "Overview", icon: Target },
              { id: "schedule", label: "Schedule", icon: Calendar },
              { id: "training", label: "Training", icon: GraduationCap },
              { id: "organizers", label: "Contact", icon: Building2 },
            ].map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 font-semibold text-sm transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? "text-primary border-b-2 border-primary bg-primary/5"
                      : "text-gray-600 dark:text-gray-400 hover:text-primary hover:bg-gray-50/50 dark:hover:bg-slate-700/50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              )
            })}
          </div>

          {/* Tab Content */}
          <div className="p-5 max-h-[600px] overflow-y-auto">
            {/* Overview */}
            {activeTab === "overview" && (
              <div className="space-y-5">
                {/* Mission & Vision - FULL TEXT with Expand */}
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    Mission & Vision
                  </h3>
                  <div className={`text-sm text-gray-700 dark:text-gray-300 leading-relaxed space-y-2 ${!expandedSections.mission ? 'line-clamp-4' : ''}`}>
                    <p>{camp.missionVision.history}</p>
                    <p>{camp.missionVision.mission}</p>
                    <p>{camp.missionVision.approach}</p>
                  </div>
                  <button
                    onClick={() => toggleSection('mission')}
                    className="mt-2 text-xs text-primary hover:underline flex items-center gap-1"
                  >
                    {expandedSections.mission ? (
                      <><ChevronUp className="w-3 h-3" /> Show Less</>
                    ) : (
                      <><ChevronDown className="w-3 h-3" /> Read More</>
                    )}
                  </button>
                </div>

                {/* Objectives - ALL 15 with Expand */}
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-3">All {camp.objectives.length} Objectives</h3>
                  <div className={`grid md:grid-cols-2 gap-2 ${!expandedSections.objectives ? 'max-h-64 overflow-hidden' : ''}`}>
                    {camp.objectives.map((obj, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-gray-700 dark:text-gray-300 p-2 bg-gray-50 dark:bg-slate-700/50 rounded">
                        <Check className="w-3 h-3 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{obj}</span>
                      </div>
                    ))}
                  </div>
                  {!expandedSections.objectives && (
                    <button
                      onClick={() => toggleSection('objectives')}
                      className="mt-2 w-full py-2 text-xs text-primary hover:bg-primary/5 rounded flex items-center justify-center gap-1 transition-colors"
                    >
                      <ChevronDown className="w-3 h-3" /> Show All {camp.objectives.length} Objectives
                    </button>
                  )}
                  {expandedSections.objectives && (
                    <button
                      onClick={() => toggleSection('objectives')}
                      className="mt-2 w-full py-2 text-xs text-primary hover:bg-primary/5 rounded flex items-center justify-center gap-1 transition-colors"
                    >
                      <ChevronUp className="w-3 h-3" /> Show Less
                    </button>
                  )}
                </div>

                {/* Eligibility - FULL TEXT with Expand */}
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">Eligibility Criteria</h3>
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-700 dark:to-slate-600 rounded-lg p-3">
                    <div className="flex items-start gap-3">
                      <Users className="w-6 h-6 text-primary flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-sm text-foreground mb-1">
                          Age Group: {camp.eligibility.minAge}-{camp.eligibility.maxAge} years
                        </p>
                        <p className={`text-xs text-gray-700 dark:text-gray-300 ${!expandedSections.eligibility ? 'line-clamp-2' : ''}`}>
                          {camp.eligibility.description}
                        </p>
                        <button
                          onClick={() => toggleSection('eligibility')}
                          className="mt-1 text-xs text-primary hover:underline flex items-center gap-1"
                        >
                          {expandedSections.eligibility ? (
                            <><ChevronUp className="w-3 h-3" /> Show Less</>
                          ) : (
                            <><ChevronDown className="w-3 h-3" /> Read More</>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Achievements */}
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">Past Achievements</h3>
                  <div className="bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-slate-700 dark:to-slate-600 rounded-lg p-3">
                    <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                      {camp.missionVision.achievements}
                    </p>
                  </div>
                </div>

                {/* VVIPs - All 5 */}
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">Distinguished Guests ({camp.vvipGuests.length})</h3>
                  <div className="grid md:grid-cols-2 gap-2">
                    {camp.vvipGuests.map((guest, idx) => (
                      <div key={idx} className="flex items-start gap-2 p-2 bg-gradient-to-r from-primary/10 to-blue-500/10 rounded">
                        <Award className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-gray-700 dark:text-gray-300">{guest}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Schedule - Compact */}
            {activeTab === "schedule" && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-3">Daily Routine</h3>
                  <div className="space-y-2">
                    {camp.dailySchedule.map((s, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-slate-700/50 rounded text-xs">
                        <span className="font-semibold text-primary w-24 flex-shrink-0">{s.time}</span>
                        <span className="text-gray-700 dark:text-gray-300">{s.activity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-foreground mb-3">Events by Date (27 Total)</h3>
                  <div className="space-y-3">
                    {Object.entries(camp.eventsByDate).map(([date, events]) => (
                      <div key={date} className="border-l-2 border-primary pl-3">
                        <h4 className="font-bold text-sm text-foreground mb-2">
                          {new Date(date).toLocaleDateString("en-IN", { month: "short", day: "numeric" })} ({events.length} events)
                        </h4>
                        <div className="space-y-1.5">
                          {events.map((event, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-xs">
                              <span className={`px-1.5 py-0.5 rounded text-white font-semibold uppercase ${
                                event.type === "ceremony" ? "bg-orange-500" :
                                event.type === "seminar" ? "bg-blue-500" :
                                event.type === "workshop" ? "bg-purple-500" : "bg-green-500"
                              }`}>
                                {event.type.slice(0, 3)}
                              </span>
                              <span className="text-gray-700 dark:text-gray-300">{event.title}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Training - Compact Grid */}
            {activeTab === "training" && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-3">Training Subjects (All {camp.trainingSubjects.length})</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {camp.trainingSubjects.map((subject) => (
                      <div key={subject} className="flex items-center gap-2 p-2 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-700 dark:to-slate-600 rounded text-xs">
                        <GraduationCap className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="font-semibold text-gray-900 dark:text-white">{subject}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-foreground mb-3">Expert Faculties (All {camp.faculties.length})</h3>
                  <div className="grid md:grid-cols-2 gap-2">
                    {camp.faculties.map((faculty, idx) => (
                      <div key={idx} className="flex items-start gap-2 p-2 bg-gray-50 dark:bg-slate-700/50 rounded text-xs">
                        <BookOpen className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">{faculty}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Organizers - FULL INFORMATION */}
            {activeTab === "organizers" && (
              <div className="space-y-4">
                {/* Contact First */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-700 dark:to-slate-600 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-foreground mb-3">{camp.organizerDetails.name}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-gray-700 dark:text-gray-300">{camp.organizerDetails.address}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                      <p className="text-gray-700 dark:text-gray-300">{camp.organizerDetails.phone} | {camp.organizerDetails.mobile}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                      <a href={`mailto:${camp.organizerDetails.email}`} className="text-primary hover:underline">{camp.organizerDetails.email}</a>
                    </div>
                  </div>
                </div>

                {/* Partners */}
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">In Cooperation With ({camp.cooperatingBodies.length})</h3>
                  <div className="grid md:grid-cols-2 gap-2">
                    {camp.cooperatingBodies.map((body, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs p-2 bg-gray-50 dark:bg-slate-700/50 rounded">
                        <Building2 className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{body}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chief Advisor */}
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">Chief Advisor</h3>
                  <div className="bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-lg p-3">
                    <p className="font-bold text-base text-foreground">{camp.chiefAdvisor.name}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{camp.chiefAdvisor.title}</p>
                  </div>
                </div>

                {/* ALL 12 Advisors with Expand */}
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">All {camp.advisors.length} Advisors</h3>
                  <div className={`grid md:grid-cols-2 gap-2 ${!expandedSections.advisors ? 'max-h-48 overflow-hidden' : ''}`}>
                    {camp.advisors.map((advisor, idx) => (
                      <div key={idx} className="p-2 bg-gray-50 dark:bg-slate-700/50 rounded text-xs">
                        <p className="font-semibold text-gray-900 dark:text-white">{advisor.name}</p>
                        <p className="text-gray-600 dark:text-gray-400">{advisor.title}</p>
                      </div>
                    ))}
                  </div>
                  {!expandedSections.advisors && (
                    <button
                      onClick={() => toggleSection('advisors')}
                      className="mt-2 w-full py-2 text-xs text-primary hover:bg-primary/5 rounded flex items-center justify-center gap-1"
                    >
                      <ChevronDown className="w-3 h-3" /> Show All {camp.advisors.length} Advisors
                    </button>
                  )}
                  {expandedSections.advisors && (
                    <button
                      onClick={() => toggleSection('advisors')}
                      className="mt-2 w-full py-2 text-xs text-primary hover:bg-primary/5 rounded flex items-center justify-center gap-1"
                    >
                      <ChevronUp className="w-3 h-3" /> Show Less
                    </button>
                  )}
                </div>

                {/* Leadership */}
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">Leadership</h3>
                  <div className="grid md:grid-cols-2 gap-2 text-xs">
                    <div className="p-2 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-700 dark:to-slate-600 rounded">
                      <p className="text-gray-600 dark:text-gray-400 text-xs">President (Camp)</p>
                      <p className="font-bold text-foreground">{camp.leadership.president.name}</p>
                    </div>
                    <div className="p-2 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-700 dark:to-slate-600 rounded">
                      <p className="text-gray-600 dark:text-gray-400 text-xs">President (Org)</p>
                      <p className="font-bold text-foreground">{camp.leadership.organizationPresident.name}</p>
                      <p className="text-gray-500 text-xs">{camp.leadership.organizationPresident.title}</p>
                    </div>
                    <div className="p-2 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-700 dark:to-slate-600 rounded">
                      <p className="text-gray-600 dark:text-gray-400 text-xs">Vice President</p>
                      <p className="font-bold text-foreground">{camp.leadership.vicePresident.name}</p>
                    </div>
                    <div className="p-2 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-700 dark:to-slate-600 rounded">
                      <p className="text-gray-600 dark:text-gray-400 text-xs">General Secretary</p>
                      <p className="font-bold text-foreground">{camp.leadership.generalSecretary.name}</p>
                    </div>
                    <div className="p-2 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-slate-700 dark:to-slate-600 rounded">
                      <p className="text-gray-600 dark:text-gray-400 text-xs">Treasurer</p>
                      <p className="font-bold text-foreground">{camp.leadership.treasurer.name}</p>
                    </div>
                    <div className="p-2 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-slate-700 dark:to-slate-600 rounded">
                      <p className="text-gray-600 dark:text-gray-400 text-xs">Additional GS</p>
                      <p className="font-bold text-foreground">{camp.leadership.additionalGeneralSecretary.name}</p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-2 mt-2 text-xs">
                    <div className="p-2 bg-gray-50 dark:bg-slate-700/50 rounded">
                      <p className="text-gray-600 dark:text-gray-400">Secretary (Culture)</p>
                      <p className="font-semibold text-foreground">{camp.leadership.secretaries.culture.name}</p>
                    </div>
                    <div className="p-2 bg-gray-50 dark:bg-slate-700/50 rounded">
                      <p className="text-gray-600 dark:text-gray-400">Secretary (Training)</p>
                      <p className="font-semibold text-foreground">{camp.leadership.secretaries.training.name}</p>
                    </div>
                    <div className="p-2 bg-gray-50 dark:bg-slate-700/50 rounded">
                      <p className="text-gray-600 dark:text-gray-400">Secretary (Science)</p>
                      <p className="font-semibold text-foreground">{camp.leadership.secretaries.science.name}</p>
                    </div>
                  </div>
                </div>

                {/* Coordinators */}
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">Coordinators</h3>
                  <div className="space-y-2 text-xs">
                    <div className="p-2 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-slate-700 dark:to-slate-600 rounded">
                      <p className="text-gray-600 dark:text-gray-400">Main Coordinator</p>
                      <p className="font-bold text-foreground">{camp.coordinators.main.name}</p>
                      <p className="text-gray-600 dark:text-gray-400">{camp.coordinators.main.title}</p>
                    </div>
                    <div className="p-2 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-slate-700 dark:to-slate-600 rounded">
                      <p className="text-gray-600 dark:text-gray-400">Joint Coordinator</p>
                      <p className="font-bold text-foreground">{camp.coordinators.joint.name}</p>
                      <p className="text-gray-600 dark:text-gray-400">{camp.coordinators.joint.title}</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-2">
                      {camp.coordinators.deputy.map((deputy, idx) => (
                        <div key={idx} className="p-2 bg-gray-50 dark:bg-slate-700/50 rounded">
                          <p className="text-gray-600 dark:text-gray-400">Deputy Coordinator</p>
                          <p className="font-semibold text-foreground">{deputy.name}</p>
                          <p className="text-gray-500">{deputy.title}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ALL 13 Camp Executives with Expand */}
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">All {camp.campExecutives.length} Camp Executives</h3>
                  <div className={`grid sm:grid-cols-2 md:grid-cols-3 gap-2 ${!expandedSections.executives ? 'max-h-32 overflow-hidden' : ''}`}>
                    {camp.campExecutives.map((executive, idx) => (
                      <div key={idx} className="p-2 bg-gray-50 dark:bg-slate-700/50 rounded text-center text-xs">
                        <p className="font-medium text-gray-900 dark:text-white">{executive}</p>
                      </div>
                    ))}
                  </div>
                  {!expandedSections.executives && (
                    <button
                      onClick={() => toggleSection('executives')}
                      className="mt-2 w-full py-2 text-xs text-primary hover:bg-primary/5 rounded flex items-center justify-center gap-1"
                    >
                      <ChevronDown className="w-3 h-3" /> Show All {camp.campExecutives.length} Executives
                    </button>
                  )}
                  {expandedSections.executives && (
                    <button
                      onClick={() => toggleSection('executives')}
                      className="mt-2 w-full py-2 text-xs text-primary hover:bg-primary/5 rounded flex items-center justify-center gap-1"
                    >
                      <ChevronUp className="w-3 h-3" /> Show Less
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CampDetailPage() {
  return (
    <Suspense fallback={<CampSkeleton />}>
      <CampDetailContent />
    </Suspense>
  )
}
