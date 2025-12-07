"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { X, Calendar, MapPin, Users, Sparkles } from "lucide-react"
import Image from "next/image"

export function CampPromoModal() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Auto-open modal on page load
    setIsOpen(true)
  }, [])

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleExplore = () => {
    router.push("/camp/nic-2025")
  }

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Gradient Border Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-white to-green-500 opacity-20 pointer-events-none" />
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-800 transition-colors shadow-lg"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>

        <div className="grid md:grid-cols-2 gap-6 p-8">
          {/* Left Side - Visual */}
          <div className="space-y-4">
            <div className="relative h-64 md:h-full rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/camp_25/Brochure, NIC, Institute of Youth Affairs_page-0001.jpg"
                alt="12th National Integration Camp"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-yellow-400" />
                  <span className="text-yellow-400 font-semibold text-sm uppercase tracking-wide">
                    12th Edition
                  </span>
                </div>
                <h3 className="text-white text-2xl font-bold">
                  National Integration Camp
                </h3>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                  Join Us for Golden India!
                </h2>
                <p className="text-lg text-primary font-semibold">
                  Empowerment of Youth for Golden India
                </p>
              </div>

              {/* Key Highlights */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      December 24-31, 2025
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      8-Day Residential Camp
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      Assam University, Silchar
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Multiple Venues Across Campus
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      500+ Participants Expected
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Age 14-22 | North-East States
                    </p>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 rounded-lg p-4">
                <p className="font-semibold text-gray-900 dark:text-white mb-2">
                  What's Included:
                </p>
                <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                  <li>✓ <strong>Free Registration</strong> with meals & refreshments</li>
                  <li>✓ Training: Yoga, Self-Defence, Music, Dance & more</li>
                  <li>✓ Seminars by ISRO, DRDO, Defence experts</li>
                  <li>✓ Cultural programs & certificate</li>
                </ul>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={handleExplore}
                className="flex-1 px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              >
                Explore Camp Details
              </button>
              <button
                onClick={handleClose}
                className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
