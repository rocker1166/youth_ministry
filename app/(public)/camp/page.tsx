"use client"

import { Suspense, useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, MapPin, Users, Award, BookOpen, GraduationCap, Sparkles, ArrowRight } from "lucide-react"
import { CAMP_2025 } from "./data"
import { CampListSkeleton } from "@/app/components/CampSkeleton"
import { shuffleArray, getGalleryImages } from "./utils"

function ChampPageContent() {
  const camp = CAMP_2025
  const [galleryImages, setGalleryImages] = useState<string[]>([])

  // Shuffle gallery images on mount
  useEffect(() => {
    const allImages = getGalleryImages()
    const shuffled = shuffleArray(allImages)
    setGalleryImages(shuffled.slice(0, 6)) // Display 6 random images
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Compact Hero Section */}
      <section className="relative py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm mb-4">
            <Sparkles className="w-3.5 h-3.5 text-yellow-500 animate-pulse" />
            <span className="text-xs font-semibold text-primary">12th Edition • Since 2014</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-3">
            National Integration Camp & Science Exhibition
          </h1>
          
          <p className="text-lg md:text-xl text-primary font-semibold mb-2">
            {camp.theme}
          </p>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
            8-day residential program • 500+ participants • Ages 14-22 • North-East India
          </p>

          <Link
            href={`/camp/${camp.id}`}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all transform hover:scale-105"
          >
            View Full Details
            <ArrowRight className="w-4 h-4" />
          </Link>

        
        </div>
      </section>

      {/* Compact Featured Camp Card with Glassmorphism */}
      <section className="pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          <Link href={`/camp/${camp.id}`}>
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/20 hover:border-primary/20 group">
              <div className="grid md:grid-cols-2 gap-4 p-5">
                {/* Left: Image */}
                <div className="relative h-48 md:h-64 rounded-lg overflow-hidden">
                  <Image
                    src={camp.brochureImages[0]}
                    alt="Camp Brochure"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-2.5 py-1 rounded-full text-xs font-bold shadow-lg">
                      {camp.edition}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <span className="bg-green-500 text-white px-2.5 py-1 rounded-full text-xs font-bold shadow-lg">
                      {camp.registrationFee}
                    </span>
                  </div>
                </div>

                {/* Right: Compact Info */}
                <div className="flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {camp.title}
                    </h2>
                    <p className="text-sm text-primary font-semibold mb-4">
                      {camp.theme}
                    </p>

                    {/* Compact Info Grid */}
                    <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-foreground">Dec 24-31</p>
                          <p className="text-xs text-gray-500">2025</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-foreground">Silchar, Assam</p>
                          <p className="text-xs text-gray-500">Assam University</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-foreground">500+ Students</p>
                          <p className="text-xs text-gray-500">Age 14-22</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-primary flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-green-600">Free Entry</p>
                          <p className="text-xs text-gray-500">North-East</p>
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs font-medium">
                        ISRO
                      </span>
                      <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded text-xs font-medium">
                        DRDO
                      </span>
                      <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded text-xs font-medium">
                        Defence
                      </span>
                      <span className="px-2 py-0.5 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded text-xs font-medium">
                        Cultural
                      </span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="px-4 py-2 bg-primary text-white rounded-lg font-semibold text-sm text-center group-hover:bg-primary/90 transition-all shadow-md group-hover:shadow-lg flex items-center justify-center gap-2 transform group-hover:scale-105">
                      View Details
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Compact Highlights Section with Glassmorphism */}
      <section className="pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          <h2 className="text-2xl font-bold text-center text-foreground mb-6">
            Camp Highlights
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            {/* Training */}
            <div className="p-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-lg shadow-md hover:shadow-lg transition-all border border-white/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground">Training</h3>
              </div>
              <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                {camp.trainingSubjects.slice(0, 5).map((subject) => (
                  <div key={subject} className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-primary rounded-full" />
                    {subject}
                  </div>
                ))}
                <p className="text-xs text-gray-500 italic">+{camp.trainingSubjects.length - 5} more</p>
              </div>
            </div>

            {/* Experts */}
            <div className="p-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-lg shadow-md hover:shadow-lg transition-all border border-white/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground">Experts</h3>
              </div>
              <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                {camp.faculties.slice(0, 4).map((faculty, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-primary rounded-full" />
                    <span className="truncate">{faculty}</span>
                  </div>
                ))}
                <p className="text-xs text-gray-500 italic">& many more</p>
              </div>
            </div>

            {/* Partners */}
            <div className="p-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-lg shadow-md hover:shadow-lg transition-all border border-white/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Award className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground">Partners</h3>
              </div>
              <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                {camp.cooperatingBodies.slice(0, 4).map((body, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <div className="w-1 h-1 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                    <span className="leading-tight text-xs">{body}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
  {/* Photo Gallery Section */}
          {galleryImages.length > 0 && (
            <div className="mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
              <h3 className="text-xl font-bold text-center text-foreground mb-6">Camp Memories</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {galleryImages.map((image, idx) => (
                  <div
                    key={idx}
                    className="relative h-48 rounded-lg overflow-hidden bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl shadow-md hover:shadow-2xl transition-all duration-300 border border-white/20 hover:border-primary/30 group"
                  >
                    <Image
                      src={image}
                      alt={`Camp Gallery ${idx + 1}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                ))}
              </div>
            </div>
          )}


      </section>

      {/* Compact CTA */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Ready to Join?
          </h2>
          <p className="text-sm md:text-base mb-6 text-blue-100">
            Be part of India's largest youth integration initiative
          </p>
          <Link
            href={`/camp/${camp.id}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary hover:bg-gray-100 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            Explore Full Details
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default function ChampPage() {
  return (
    <Suspense fallback={<CampListSkeleton />}>
      <ChampPageContent />
    </Suspense>
  )
}
