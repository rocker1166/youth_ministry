"use client"

import Link from "next/link"
import { Calendar, MapPin, Sparkles, ArrowRight } from "lucide-react"

export function CampBanner() {
  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto">
        <Link href="/camp">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 via-blue-600 to-green-500 p-1 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] group">
            {/* Content Container */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Left Side - Content */}
                <div className="flex-1 text-center md:text-left">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-orange-900/30 dark:to-yellow-900/30 px-4 py-2 rounded-full mb-4">
                    <Sparkles className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                    <span className="text-sm font-bold text-orange-700 dark:text-orange-300 uppercase tracking-wide">
                      Featured Camp • 12th Edition
                    </span>
                  </div>

                  {/* Headline */}
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                    12th National Integration Camp & Science Exhibition 2025
                  </h2>

                  {/* Details */}
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-4 text-sm md:text-base">
                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <Calendar className="w-5 h-5 text-primary" />
                      <span className="font-semibold">Dec 24-31, 2025</span>
                    </div>
                    <div className="hidden md:block w-1 h-1 bg-gray-400 rounded-full" />
                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <MapPin className="w-5 h-5 text-primary" />
                      <span>Assam University, Silchar</span>
                    </div>
                    <div className="hidden md:block w-1 h-1 bg-gray-400 rounded-full" />
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-bold">
                        FREE Registration
                      </span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
                    500+ Participants | Training, Seminars by ISRO, DRDO, DBT & Defence Experts | Cultural Programs
                  </p>
                </div>

                {/* Right Side - CTA */}
                <div className="flex-shrink-0">
                  <div className="flex flex-col items-center gap-3">
                    <div className="px-8 py-4 bg-gradient-to-r from-primary to-blue-600 text-white rounded-xl font-bold text-lg shadow-lg group-hover:shadow-xl transition-all transform group-hover:scale-110 flex items-center gap-2">
                      Learn More & Register
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold">
                      Limited Seats Available
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  )
}
