"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

const programs = [
  {
    id: "national-integration",
    title: "National Integration Camp",
    shortTitle: "National Integration",
    fullDescription:
      "8-day residential program bringing together 500+ youth from North-East India to promote unity, peace, and cultural exchange. Participants engage in collaborative activities, cultural exchanges, and team-building exercises to foster national integration and youth leadership.",
    image1: "/galary/1.jpeg",
    image2: "/galary/18.jpeg",
    link: "/camp",
  },
  {
    id: "training-workshops",
    title: "Training & Workshops",
    shortTitle: "Training & Workshops",
    fullDescription:
      "Comprehensive training programs including Yoga, Aerobics, Self Defence, Drill, Music, Dance, and Career Guidance. Expert faculty from ISRO, DRDO, and leading institutions provide hands-on training to enhance skills and build confidence in young participants.",
    image1: "/galary/5.jpeg",
    image2: "/galary/23.jpeg",
    link: "/camp",
  },
  {
    id: "cultural-programs",
    title: "Cultural Programs",
    shortTitle: "Cultural Programs",
    fullDescription:
      "Vibrant cultural celebrations showcasing the rich diversity of India's North-Eastern states. Participants perform traditional dances, music, and drama while learning about different cultures, promoting mutual understanding and appreciation of our cultural heritage.",
    image1: "/galary/10.jpeg",
    image2: "/galary/15.jpeg",
    link: "/camp",
  },
  {
    id: "science-exhibition",
    title: "Science Exhibition",
    shortTitle: "Science Exhibition",
    fullDescription:
      "National-level science exhibition promoting innovation and scientific thinking among youth. Features seminars on Space Science, AI, Defence Research, and Environment. Platform for students to showcase projects and interact with leading scientists and researchers.",
    image1: "/galary/20.jpeg",
    image2: "/galary/25.jpeg",
    link: "/camp",
  },
  {
    id: "youth-leadership",
    title: "Youth Leadership Development",
    shortTitle: "Youth Leadership",
    fullDescription:
      "National seminars and leadership training sessions with distinguished speakers from government, defence, and academia. Focus on developing leadership qualities, decision-making skills, and preparing youth for contributing to India's development and Golden future.",
    image1: "/galary/12.jpeg",
    image2: "/galary/28.jpeg",
    link: "/camp",
  },
]

export function Programs() {
  const [activeTab, setActiveTab] = useState(programs[0].id)
  const activeProgram = programs.find((p) => p.id === activeTab) || programs[0]

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header with Title and Tabs Inline */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 whitespace-nowrap">
            Our <span className="text-primary">Programs</span>
          </h2>
          
          {/* Tabs */}
          <div className="flex flex-wrap gap-2">
            {programs.map((program) => (
              <button
                key={program.id}
                onClick={() => setActiveTab(program.id)}
                className={`px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === program.id
                    ? "bg-black text-white"
                    : "bg-white text-gray-900 border-2 border-gray-900 hover:bg-gray-50"
                }`}
              >
                {program.shortTitle}
              </button>
            ))}
          </div>
        </div>

        {/* Content - Compact Layout */}
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left - Two Images Overlapped */}
          <div className="relative h-[400px] md:h-[500px]">
            {/* Back Image - Computer Screen */}
            <div className="absolute top-0 left-0 w-[70%] h-[70%] rounded-xl overflow-hidden shadow-2xl z-10">
              <Image
                src={activeProgram.image1}
                alt={`${activeProgram.title} - Image 1`}
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Front Image - Overlapping Papers/Colors */}
            <div className="absolute bottom-0 right-0 w-[60%] h-[60%] rounded-xl overflow-hidden shadow-2xl z-20">
              <Image
                src={activeProgram.image2}
                alt={`${activeProgram.title} - Image 2`}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-4">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
              {activeProgram.title.split(' ').slice(0, -1).join(' ')}{' '}
              <span className="text-primary">{activeProgram.title.split(' ').slice(-1)}</span>
            </h3>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              {activeProgram.fullDescription}
            </p>
            <div>
              <Link href={activeProgram.link}>
                <Button
                  variant="outline"
                  className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-6 py-2 rounded-lg font-medium text-sm"
                >
                  Know more
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
