"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Download, ExternalLink } from "lucide-react"
import Link from "next/link"
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { TypingText } from "./typing-text"

export function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-primary-50 via-white to-primary-50 overflow-hidden">
      {/* Background Pattern - Government Style */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-primary-200 rounded-full shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-sm font-semibold text-primary">Empowering India's Youth</span>
            </div>

            {/* Main Heading - Government Style */}
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                <span className="block">Building</span>
                <span className="text-primary block">
                  <TypingText 
                    texts={["Innovators", "Entrepreneurs", "Changemakers", "Visionaries"]}
                    typingSpeed={120}
                    deletingSpeed={80}
                    pauseDuration={2500}
                  />
                </span>
                <span className="block">for Tomorrow</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl">
                The Institute of Youth Affairs is dedicated to developing holistic personality development programs, skill
                enhancement, and career guidance for youth across India.
              </p>
            </div>

            {/* CTA Buttons - Government Style */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="bg-primary hover:bg-primary-700 text-white shadow-lg hover:shadow-xl transition-all group">
                Apply for Programs 
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-gray-300 hover:border-primary hover:text-primary group">
                Learn More
                <ExternalLink className="ml-2 group-hover:scale-110 transition-transform" size={18} />
              </Button>
            </div>

            {/* Quick Links - Government Portal Style */}
            <div className="flex flex-wrap gap-4 pt-6 text-sm">
              <a 
                href="/INSTITUTE_OF_YOUTH_AFFAIRS.pdf" 
                download
                className="text-primary hover:underline font-medium flex items-center gap-1"
              >
                <Download size={16} />
                Program Brochure
              </a>
              <span className="text-gray-300">|</span>
              <Link href="/events" className="text-primary hover:underline font-medium">
                Upcoming Events
              </Link>
              <span className="text-gray-300">|</span>
              <Link href="/apply" className="text-primary hover:underline font-medium">
                Application Form
              </Link>
            </div>

            {/* Stats Row - UX4G Style */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t-2 border-gray-200">
              <div className="text-center sm:text-left">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">50+</div>
                <p className="text-sm text-gray-600 font-medium">Programs</p>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-3xl md:text-4xl font-bold text-green-600 mb-1">100K+</div>
                <p className="text-sm text-gray-600 font-medium">Youth Trained</p>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-1">28</div>
                <p className="text-sm text-gray-600 font-medium">States</p>
              </div>
            </div>
          </div>

          {/* Hero Image - Government Portal Style */}
          <div className="relative">
            {/* Main Image Container */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl ">
              <div className="aspect-[4/3] bg-gradient-to-br from-primary-100 to-primary-200">
                <DotLottieReact
                  src="https://lottie.host/b5f4184c-4ed3-44fe-b163-d32ab7aca0f5/Yq6Fep5PI8.lottie"
                  loop
                  autoplay
                  className="w-full h-full"
                />
              </div>
              {/* Overlay Badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-white shadow-md">
                    <img 
                      src="/logo/Logo.jpg" 
                      alt="Institute Logo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 mb-1">Digital India Initiative</p>
                    <p className="text-xs text-gray-600">Ministry of Youth Affairs & Sports</p>
                  </div>
                </div>
              </div>
            </div>

          

           
          </div>
        </div>
      </div>

      {/* Bottom Wave - Government Style */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 48h1440V0s-360 48-720 48S0 0 0 0v48z" fill="white"/>
        </svg>
      </div>
    </section>
  )
}
