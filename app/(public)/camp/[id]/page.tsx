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
import { useToast } from "@/app/components/ToastProvider"
import { CampSkeleton } from "@/app/components/CampSkeleton"

function CampDetailContent() {
  const params = useParams()
  const campId = params.id as string
  const { showToast } = useToast()
  
  const [activeTab, setActiveTab] = useState("overview")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [scienceImageIndex, setScienceImageIndex] = useState(0)
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
          <Link href="/camp" className="text-primary hover:underline">
            ← Back to Camps
          </Link>
        </div>
      </div>
    )
  }

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  // Separate navigation functions for main camp brochure
  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % camp.brochureImages.length)
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + camp.brochureImages.length) % camp.brochureImages.length)

  // Separate navigation functions for science exhibition brochure
  const nextScienceImage = () => setScienceImageIndex((prev) => (prev + 1) % (camp.scienceExhibition?.brochureImages.length ?? 1))
  const prevScienceImage = () => setScienceImageIndex((prev) => (prev - 1 + (camp.scienceExhibition?.brochureImages.length ?? 1)) % (camp.scienceExhibition?.brochureImages.length ?? 1))

  const handleRegister = () => {
    // Open registration form in a new tab
    window.open(`https://forms.gle/SgYjCxwDWHf5rfv39`, '_blank')
  }

  const handleShare = async () => {
    const url = "https://forms.gle/SgYjCxwDWHf5rfv39"  //gform for registration
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
          <Link href="/camp" className="inline-flex items-center gap-2 text-primary hover:underline text-sm transition-all hover:gap-3">
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

              {/* Science Exhibition Badge */}
              {camp.scienceExhibition && (
                <div className="mt-3 bg-gradient-to-r from-orange-500 via-green-500 to-orange-500 p-[2px] rounded-lg">
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-2.5">
                    <div className="flex items-center gap-2 justify-center">
                      <Sparkles className="w-4 h-4 text-orange-600" />
                      <div className="text-center flex-1">
                        <p className="text-xs font-bold text-orange-600 dark:text-orange-400">SPECIAL EVENT</p>
                        <p className="text-sm font-extrabold text-gray-900 dark:text-white">Science Exhibition</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Dec 28-30 • 11 AM - 7 PM • FREE</p>
                      </div>
                      <Sparkles className="w-4 h-4 text-green-600" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2">
              <button onClick={handleRegister} className="flex-1 px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all shadow-md hover:shadow-lg font-semibold flex items-center justify-center gap-2 transform hover:scale-[1.02]">
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
              ...(camp.scienceExhibition ? [{ id: "science", label: "Science Exhibition", icon: Sparkles }] : []),
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
          <div className="p-5">
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

            {/* Science Exhibition Tab - COMPACT REDESIGN WITH THEME COLORS */}
            {activeTab === "science" && camp.scienceExhibition && (
              <div className="space-y-6">
                {/* COMPACT Exhibition Header - Balanced Heights, Theme Colors */}
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-orange-50/50 via-white to-green-50/50 dark:from-orange-900/10 dark:via-slate-800 dark:to-green-900/10 border border-orange-200/30 dark:border-orange-700/30">
                  {/* Subtle Background Pattern */}
                  <div className="absolute inset-0 opacity-5 dark:opacity-10" style={{
                    backgroundImage: `radial-gradient(circle at 10% 20%, rgba(251, 146, 60, 0.3) 0%, transparent 50%),
                                     radial-gradient(circle at 90% 80%, rgba(34, 197, 94, 0.3) 0%, transparent 50%)`
                  }} />
                  
                  <div className="relative p-5">
                    {/* BALANCED SPLIT LAYOUT */}
                    <div className="grid lg:grid-cols-2 gap-5 items-stretch">
                      {/* LEFT: Compact Brochure (1/2 width) */}
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="p-1 bg-gradient-to-br from-orange-500 to-orange-600 rounded shadow-sm">
                            <BookOpen className="w-3.5 h-3.5 text-white" />
                          </div>
                          <h4 className="text-xs font-bold text-gray-600 dark:text-gray-400">Exhibition Brochure</h4>
                        </div>
                        
                        {/* Compact Brochure Viewer - MATCHES TEXT HEIGHT */}
                        <div className="relative flex-1 bg-gradient-to-br from-orange-100/50 to-green-100/50 dark:from-orange-900/20 dark:to-green-900/20 rounded-lg overflow-hidden shadow-lg border-2 border-orange-200/50 dark:border-orange-700/50">
                          <Image
                            src={camp.scienceExhibition?.brochureImages[scienceImageIndex] ?? ''}
                            alt={`Brochure Page ${scienceImageIndex + 1}`}
                            fill
                            className="object-contain p-2 cursor-pointer"
                            onClick={() => setIsLightboxOpen(true)}
                          />
                          <div className="absolute inset-0 flex items-center justify-between px-1 z-10">
                            <button
                              onClick={prevScienceImage}
                              className="p-1.5 bg-white/90 dark:bg-slate-800/90 rounded-full shadow-md hover:scale-110 hover:bg-orange-50 transition-all"
                            >
                              <ChevronLeft className="w-3.5 h-3.5 text-orange-600" />
                            </button>
                            <button
                              onClick={nextScienceImage}
                              className="p-1.5 bg-white/90 dark:bg-slate-800/90 rounded-full shadow-md hover:scale-110 hover:bg-orange-50 transition-all"
                            >
                              <ChevronRight className="w-3.5 h-3.5 text-orange-600" />
                            </button>
                          </div>
                          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-600 to-green-600 text-white px-2 py-0.5 rounded-full shadow-md text-xs font-semibold z-10">
                            {scienceImageIndex + 1}/{camp.scienceExhibition?.brochureImages.length ?? 0}
                          </div>
                        </div>
                        
                        {/* Minimal Download Button */}
                        <button
                          onClick={() => {
                            const link = document.createElement("a")
                            link.href = camp.scienceExhibition?.brochurePDF ?? ''
                            link.download = "Science-Exhibition-2025-Brochure.pdf"
                            link.click()
                            showToast("Downloading exhibition brochure", "success")
                          }}
                          className="w-full mt-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-all text-xs flex items-center justify-center gap-1.5 text-gray-700 dark:text-gray-300"
                        >
                          <Download className="w-3.5 h-3.5" />
                          Download PDF Brochure
                        </button>
                      </div>

                      {/* RIGHT: Exhibition Info (1/2 width) - MATCHES BROCHURE HEIGHT */}
                      <div className="flex flex-col justify-between">
                        {/* Header Badge */}
                        <div className="flex items-center gap-2 mb-2">
                          <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-orange-600 to-green-600 text-white px-2.5 py-1 rounded-full text-xs font-bold shadow-md">
                            <Sparkles className="w-3 h-3" />
                            SPECIAL EVENT
                          </div>
                        </div>

                        {/* Title & Theme - Compact */}
                        <div className="mb-3">
                          <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 dark:text-white mb-1.5 leading-tight">
                            Science Exhibition
                          </h2>
                          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 leading-snug">
                            {camp.scienceExhibition.theme}
                          </p>
                        </div>

                        {/* Compact Info Grid */}
                        <div className="grid grid-cols-3 gap-2 mb-3">
                          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm px-2 py-2 rounded-lg border border-orange-200/50 dark:border-orange-700/50">
                            <div className="flex flex-col items-center text-center">
                              <div className="p-1 bg-gradient-to-br from-orange-500 to-orange-600 rounded mb-1">
                                <Calendar className="w-3 h-3 text-white" />
                              </div>
                              <p className="text-xs font-bold text-gray-900 dark:text-white">Dec 28-30</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">3 Days</p>
                            </div>
                          </div>
                          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm px-2 py-2 rounded-lg border border-green-200/50 dark:border-green-700/50">
                            <div className="flex flex-col items-center text-center">
                              <div className="p-1 bg-gradient-to-br from-green-500 to-green-600 rounded mb-1">
                                <Clock className="w-3 h-3 text-white" />
                              </div>
                              <p className="text-xs font-bold text-gray-900 dark:text-white">11 AM - 7 PM</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Daily</p>
                            </div>
                          </div>
                          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm px-2 py-2 rounded-lg border border-orange-200/50 dark:border-orange-700/50">
                            <div className="flex flex-col items-center text-center">
                              <div className="p-1 bg-gradient-to-br from-orange-500 to-green-600 rounded mb-1">
                                <MapPin className="w-3 h-3 text-white" />
                              </div>
                              <p className="text-xs font-bold text-gray-900 dark:text-white">Assam Univ</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Silchar</p>
                            </div>
                          </div>
                        </div>

                        {/* Compact Description */}
                        <div className="bg-gradient-to-br from-orange-50/80 to-green-50/80 dark:from-orange-900/20 dark:to-green-900/20 p-3 rounded-lg border border-orange-200/30 dark:border-orange-700/30 flex-1">
                          <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                            {camp.scienceExhibition?.description.substring(0, 180)}...
                          </p>
                          <div className="mt-2 flex items-center gap-1 text-orange-600 dark:text-orange-400">
                            <Award className="w-3 h-3" />
                            <span className="text-xs font-semibold">Free for all participants</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* MODERN About Exhibition */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-blue-50/50 dark:from-slate-800/50 dark:to-blue-900/20 p-6 border border-gray-200/50 dark:border-slate-700/50">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg shadow-lg">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">About the Exhibition</h3>
                  </div>
                  <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                    {camp.scienceExhibition?.description}
                  </p>
                </div>

                {/* STUNNING Benefits Grid with Icons */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg shadow-lg">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      12 Key Benefits for Participants
                    </h3>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {camp.scienceExhibition?.benefits.map((benefit, idx) => (
                      <div 
                        key={idx} 
                        className="group relative overflow-hidden bg-gradient-to-br from-white to-purple-50/50 dark:from-slate-800 dark:to-purple-900/20 p-4 rounded-xl border-2 border-purple-200/50 dark:border-purple-700/50 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
                      >
                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
                        <div className="relative flex items-start gap-3">
                          <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg shadow-md flex-shrink-0">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 leading-tight">{benefit}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* NEON Tech Sessions */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-900/10 to-indigo-900/10 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 border-2 border-blue-200/30 dark:border-blue-700/30">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg shadow-lg">
                      <Sparkles className="w-6 h-6 text-white animate-pulse" />
                    </div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      Special Technology Sessions
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {camp.scienceExhibition?.specialSessions.map((session, idx) => (
                      <div
                        key={idx}
                        className="group relative px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-bold text-sm shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300 cursor-pointer"
                      >
                        <div className="absolute inset-0 bg-white/20 rounded-full blur-xl group-hover:bg-white/30 transition-all duration-300" />
                        <span className="relative z-10">{session}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex items-start gap-2 bg-blue-50/50 dark:bg-blue-900/20 p-4 rounded-xl">
                    <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                      <strong>Hands-on sessions</strong> by industry experts on cutting-edge technologies shaping India's digital future
                    </p>
                  </div>
                </div>

                {/* Science-Specific Seminars */}
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-green-600" />
                    Science Exhibition Seminars
                  </h3>
                  <div className="space-y-4">
                    {camp.scienceExhibition.seminars.map((day, idx) => (
                      <div key={idx} className="bg-white dark:bg-slate-700/50 rounded-lg border border-gray-200 dark:border-slate-600 overflow-hidden">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 font-bold text-sm">
                          {new Date(day.date).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                        </div>
                        <div className="p-4 space-y-2">
                          {day.events.map((event, eventIdx) => (
                            <div key={eventIdx} className="flex items-start gap-2 text-sm">
                              <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-1.5 flex-shrink-0" />
                              <span className="text-gray-700 dark:text-gray-300">{event}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-3 italic">
                    🔬 <strong>Note:</strong> These are science-focused seminars in addition to the main camp schedule
                  </p>
                </div>

                {/* Expected Government Departments */}
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-orange-600" />
                    Expected Participating Departments
                  </h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {camp.scienceExhibition.expectedDepartments.map((dept, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg border-l-4 border-orange-500 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{dept}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-3 italic">
                    * Major Government departments, PSUs, and research organizations will showcase their innovations
                  </p>
                </div>

                {/* Call to Action */}
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-xl shadow-xl">
                  <h3 className="text-xl font-bold mb-2">🚀 Don't Miss This Opportunity!</h3>
                  <p className="text-sm mb-4 opacity-90">
                    Experience cutting-edge science, meet ISRO & DRDO scientists, explore innovations, and build your future in STEM.
                    <strong> Completely FREE for all camp participants!</strong>
                  </p>
                  <div className="flex gap-3">
                  <Link href="https://forms.gle/SgYjCxwDWHf5rfv39" target="_blank" className="flex-1 px-4 py-3 bg-white text-purple-600 rounded-lg hover:bg-gray-100 transition-all shadow-md hover:shadow-lg font-semibold flex items-center justify-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Register for Camp
                    </Link>
                    <button 
                      onClick={handleShare}
                      className="px-4 py-3 bg-white/20 hover:bg-white/30 rounded-lg transition-all flex items-center justify-center gap-2"
                    >
                      <Share2 className="w-4 h-4" />
                      Share
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Lightbox Modal for Brochure Viewing */}
        {isLightboxOpen && (
          <div 
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setIsLightboxOpen(false)}
          >
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all z-10"
            >
              <X className="w-6 h-6 text-white" />
            </button>
            
            <div className="relative max-w-4xl w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
              <Image
                src={activeTab === "science" && camp.scienceExhibition 
                  ? camp.scienceExhibition.brochureImages[scienceImageIndex]
                  : camp.brochureImages[currentImageIndex]
                }
                alt={`Brochure Page ${activeTab === "science" ? scienceImageIndex + 1 : currentImageIndex + 1}`}
                fill
                className="object-contain"
              />
              
              <button
                onClick={(e) => { 
                  e.stopPropagation(); 
                  activeTab === "science" ? prevScienceImage() : prevImage();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white rounded-full shadow-2xl hover:scale-110 transition-all"
              >
                <ChevronLeft className="w-6 h-6 text-gray-900" />
              </button>
              
              <button
                onClick={(e) => { 
                  e.stopPropagation(); 
                  activeTab === "science" ? nextScienceImage() : nextImage();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white rounded-full shadow-2xl hover:scale-110 transition-all"
              >
                <ChevronRight className="w-6 h-6 text-gray-900" />
              </button>
              
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 px-4 py-2 rounded-full shadow-xl">
                <span className="text-sm font-bold text-gray-900">
                  {activeTab === "science" && camp.scienceExhibition 
                    ? `${scienceImageIndex + 1} / ${camp.scienceExhibition.brochureImages.length}`
                    : `${currentImageIndex + 1} / ${camp.brochureImages.length}`
                  }
                </span>
              </div>
            </div>
          </div>
        )}
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
