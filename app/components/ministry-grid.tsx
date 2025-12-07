"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Calendar, Play } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function MinistryGrid() {
  const events = [
    {
      id: 1,
      title: "Youth Leadership Development Program",
      date: "March 15, 2024",
      description:
        "A comprehensive leadership development program was organized, bringing together aspiring youth leaders from across India to enhance their skills in communication, decision-making, and team management for building a better tomorrow.",
      images: [
        "/galary/27.jpeg",
  "/galary/2.jpeg",
  "/galary/3.jpeg",
  "/galary/4.jpeg",
  "/galary/5.jpeg",
  "/galary/6.jpeg",
  "/galary/7.jpeg"
       ],
      link: "/events/leadership-program-2024",
      compendiumLink: "/compendium/leadership-2024",
      videoLink: "/videos/leadership-highlights",
    },
    {
      id: 2,
      title: "National Skill Enhancement Workshop",
      date: "June 20, 2024",
      description:
        "An intensive skill enhancement workshop conducted in partnership with leading industry experts to provide youth with technical and professional skills training aligned with future job market requirements and opportunities.",
      images: [
          "/galary/8.jpeg",
  "/galary/9.jpeg",
  "/galary/10.jpeg",
  "/galary/11.jpeg",
  "/galary/12.jpeg",
  "/galary/13.jpeg",
  "/galary/14.jpeg"  
      ],
      link: "/events/skill-workshop-2024",
      compendiumLink: "/compendium/skills-2024",
      videoLink: "/videos/skills-highlights",
    },
    {
      id: 3,
      title: "Entrepreneurship and Innovation Summit",
      date: "August 25, 2024",
      description:
        "A dynamic summit showcasing young entrepreneurs and innovative startups from across the nation. Industry leaders shared insights on building successful ventures, accessing funding, and creating sustainable business models.",
      images: [
       "/galary/15.jpeg",
  "/galary/16.jpeg",
  "/galary/17.jpeg",
  "/galary/25.jpeg",
  "/galary/19.jpeg",
  "/galary/20.jpeg",
  "/galary/21.jpeg"
      ],
      link: "/events/entrepreneurship-summit-2024",
      compendiumLink: "/compendium/entrepreneurship-2024",
      videoLink: "/videos/entrepreneurship-highlights",
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const currentEvent = events[currentIndex]

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? events.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === events.length - 1 ? 0 : prev + 1))
  }

  return (
    <section className="py-16 bg-gray-50">
      {/* Container Box with Dark Background */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
            {/* Left - Content */}
            <div className="text-white space-y-6">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                <span className="text-primary">{currentEvent.title.split(' ').slice(0, 2).join(' ')}</span>{" "}
                <span className="text-white">{currentEvent.title.split(' ').slice(2).join(' ')}</span>
              </h2>

              <div className="flex items-center gap-2 text-gray-300">
                <Calendar size={18} />
                <span className="text-sm font-medium">Date: {currentEvent.date}</span>
              </div>

              <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                {currentEvent.description}
              </p>

              {/* Action Buttons
              <div className="flex flex-wrap gap-4 pt-4">
                <Link href={currentEvent.link}>
                  <Button className="bg-white text-gray-900 hover:bg-gray-100 rounded-full px-6 py-2 font-medium">
                    View Details
                  </Button>
                </Link>
                <Link href={currentEvent.compendiumLink}>
                  <Button variant="outline" className="border-2 border-white text-black hover:bg-white hover:text-gray-900 rounded-full px-6 py-2 font-medium">
                    Compendium
                  </Button>
                </Link>
                <Link href={currentEvent.videoLink}>
                  <Button variant="ghost" className="text-white hover:bg-white/10 rounded-full p-3">
                    <Play size={20} fill="white" />
                  </Button>
                </Link>
              </div>
              */}
              
            </div>

            {/* Right - Image Grid with Navigation - Matching Reference Layout */}
            <div className="relative">
              {/* Image Grid - 3 columns layout as per reference */}
              <div className="grid grid-cols-3 gap-3">
                {/* Row 1 - Top: Small horizontal + Large vertical (spans 2 rows) + Small square */}
                <div className="relative h-32 rounded-lg overflow-hidden shadow-xl">
                  <Image
                    src={currentEvent.images[0]}
                    alt={`${currentEvent.title} - 1`}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="relative row-span-2 h-72 rounded-lg overflow-hidden shadow-xl">
                  <Image
                    src={currentEvent.images[1]}
                    alt={`${currentEvent.title} - 2`}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="relative h-32 rounded-lg overflow-hidden shadow-xl">
                  <Image
                    src={currentEvent.images[2]}
                    alt={`${currentEvent.title} - 3`}
                    fill
                    className="object-cover"
                  />
                </div>
                
                {/* Row 2 - Middle: Large speaker image (left) + Large vertical continues (center) + Vertical image (right, spans 2 rows) */}
                <div className="relative h-36 rounded-lg overflow-hidden shadow-xl">
                  <Image
                    src={currentEvent.images[3]}
                    alt={`${currentEvent.title} - 4`}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="relative row-span-2 h-72 rounded-lg overflow-hidden shadow-xl">
                  <Image
                    src={currentEvent.images[4]}
                    alt={`${currentEvent.title} - 5`}
                    fill
                    className="object-cover"
                  />
                </div>
                
                {/* Row 3 - Bottom: Small horizontal image (left) + Bottom right small image */}
                <div className="relative h-32 rounded-lg overflow-hidden shadow-xl">
                  <Image
                    src={currentEvent.images[5]}
                    alt={`${currentEvent.title} - 6`}
                    fill
                    className="object-cover"
                  />
                </div>
                
                {/* 7th image - Bottom center (filling the blank space) */}
                <div className="relative h-32 rounded-lg overflow-hidden shadow-xl">
                  <Image
                    src={currentEvent.images[6]}
                    alt={`${currentEvent.title} - 7`}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Navigation Controls */}
            
              <div className="absolute -bottom-6  py-4 right-0 flex gap-3">
                <button
                  onClick={handlePrevious}
                  className="bg-primary hover:bg-primary/90 text-white rounded-full p-3 shadow-lg transition-all hover:scale-105"
                  aria-label="Previous event"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={handleNext}
                  className="bg-primary hover:bg-primary/90 text-white rounded-full p-3 shadow-lg transition-all hover:scale-105"
                  aria-label="Next event"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Event Counter */}
              <div className="py-2">
              <div className="absolute -bottom-6 left-0 bg-white/10 backdrop-blur-sm  text-white px-4 py-2 rounded-full text-sm font-medium">
                {currentIndex + 1} / {events.length}
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
