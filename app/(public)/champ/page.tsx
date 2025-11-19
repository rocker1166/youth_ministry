"use client"

import Link from "next/link"
import Image from "next/image"
import { Calendar, MapPin, Users, Award, BookOpen, GraduationCap, Sparkles } from "lucide-react"
import { CAMP_2025 } from "./data"

export default function ChampPage() {
  const camp = CAMP_2025

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-white to-green-500" />
          </div>
          
          <div className="relative max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-full shadow-md mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-semibold text-primary">12th Edition • Since 2014</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
              National Integration Camp
            </h1>
            
            <p className="text-xl md:text-2xl text-primary font-semibold mb-3 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
              {camp.theme}
            </p>
            
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
              An 8-day residential youth leadership and cultural integration program bringing together 500+ participants from across North-East India
            </p>

            <div className="flex flex-wrap justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400">
              <Link
                href={`/champ/${camp.id}`}
                className="px-8 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              >
                View Full Details
              </Link>
              <a
                href={`#quick-info`}
                className="px-8 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-lg font-semibold transition-all duration-200"
              >
                Learn More
              </a>
            </div>
          </div>
        </section>

        {/* Featured Camp Card */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <Link href={`/champ/${camp.id}`}>
              <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-primary/20 transform hover:scale-[1.02] group">
                <div className="grid md:grid-cols-5 gap-6 p-6">
                  {/* Left: Image Carousel Preview */}
                  <div className="md:col-span-2">
                    <div className="relative h-64 md:h-full rounded-xl overflow-hidden shadow-lg">
                      <div className="relative w-full h-full">
                        <Image
                          src={camp.brochureImages[0]}
                          alt="Camp Brochure"
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      
                      {/* Edition Badge */}
                      <div className="absolute top-4 right-4">
                        <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg">
                          {camp.edition}
                        </span>
                      </div>

                      {/* Free Badge */}
                      <div className="absolute bottom-4 left-4">
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase shadow-lg">
                          {camp.registrationFee}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Content */}
                  <div className="md:col-span-3 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h2 className="text-3xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                            {camp.title}
                          </h2>
                          <p className="text-lg text-primary font-semibold mb-4">
                            {camp.theme}
                          </p>
                        </div>
                      </div>

                      {/* Key Info Grid */}
                      <div className="grid sm:grid-cols-2 gap-4 mb-6">
                        <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                          <Calendar className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Duration</p>
                            <p className="font-semibold text-foreground">Dec 24-31, 2025</p>
                            <p className="text-xs text-gray-500 dark:text-gray-500">8 Days</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                          <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Location</p>
                            <p className="font-semibold text-foreground">Assam University</p>
                            <p className="text-xs text-gray-500 dark:text-gray-500">Silchar, Assam</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                          <Users className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Participants</p>
                            <p className="font-semibold text-foreground">500+ Expected</p>
                            <p className="text-xs text-gray-500 dark:text-gray-500">Age 14-22</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                          <Award className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Eligibility</p>
                            <p className="font-semibold text-foreground">North-East Youth</p>
                            <p className="text-xs text-gray-500 dark:text-gray-500">All states included</p>
                          </div>
                        </div>
                      </div>

                      {/* Highlights */}
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
                          ISRO Experts
                        </span>
                        <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs font-medium">
                          DRDO Seminars
                        </span>
                        <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium">
                          Defence Training
                        </span>
                        <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-xs font-medium">
                          Cultural Programs
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 flex gap-3">
                      <div className="flex-1 px-6 py-3 bg-primary text-white rounded-lg font-semibold text-center group-hover:bg-primary/90 transition-colors shadow-md">
                        View Full Details →
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Quick Info Section */}
        <section id="quick-info" className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-800/50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">
              Camp Highlights
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Training Subjects */}
              <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 rounded-xl shadow-lg">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Training Subjects</h3>
                <div className="space-y-2">
                  {camp.trainingSubjects.slice(0, 6).map((subject) => (
                    <div key={subject} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {subject}
                    </div>
                  ))}
                  <p className="text-xs text-gray-500 dark:text-gray-400 italic mt-2">
                    +{camp.trainingSubjects.length - 6} more subjects
                  </p>
                </div>
              </div>

              {/* Notable Faculties */}
              <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-800 dark:to-slate-700 rounded-xl shadow-lg">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Expert Faculties</h3>
                <div className="space-y-2">
                  {camp.faculties.slice(0, 5).map((faculty, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {faculty}
                    </div>
                  ))}
                  <p className="text-xs text-gray-500 dark:text-gray-400 italic mt-2">
                    & many more distinguished experts
                  </p>
                </div>
              </div>

              {/* Organizing Bodies */}
              <div className="p-6 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-slate-800 dark:to-slate-700 rounded-xl shadow-lg">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">In Cooperation With</h3>
                <div className="space-y-2">
                  {camp.cooperatingBodies.map((body, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                      <span className="leading-tight">{body}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary to-blue-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Join the Movement?
            </h2>
            <p className="text-lg mb-8 text-blue-100">
              Be part of India's largest youth integration initiative. Registration opens soon!
            </p>
            <Link
              href={`/champ/${camp.id}`}
              className="inline-block px-8 py-4 bg-white text-primary hover:bg-gray-100 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              Explore Full Camp Details
            </Link>
          </div>
        </section>
      </div>
  )
}
