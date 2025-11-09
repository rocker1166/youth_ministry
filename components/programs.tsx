"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

const programs = [
  {
    id: "leadership",
    title: "Leadership Development",
    shortTitle: "Leadership Development",
    fullDescription:
      "Comprehensive programs to develop leadership qualities, decision-making skills, and professional growth in young individuals. Our leadership training focuses on building confidence, communication, and team management abilities.",
    image1: "/global-partnership.jpg",
    image2: "/funding-success.jpg",
    link: "/programs/leadership",
  },
  {
    id: "skill-enhancement",
    title: "Skill Enhancement",
    shortTitle: "Skill Enhancement",
    fullDescription:
      "Technical and soft skills training programs aligned with industry requirements and future job market demands. Enhance your capabilities through hands-on workshops, certifications, and practical learning experiences.",
    image1: "/digital-training.jpg",
    image2: "/entrepreneurship-success.jpg",
    link: "/programs/skills",
  },
  {
    id: "entrepreneurship",
    title: "Entrepreneurship Program",
    shortTitle: "Entrepreneurship",
    fullDescription:
      "Mentorship and funding support for young entrepreneurs to turn their ideas into successful ventures. Get access to industry experts, startup resources, and networking opportunities to launch your business.",
    image1: "/funding-success.jpg",
    image2: "/digital-launch.jpg",
    link: "/programs/entrepreneurship",
  },
  {
    id: "career-counseling",
    title: "Career Counseling",
    shortTitle: "Career Counseling",
    fullDescription:
      "Expert guidance for career planning, job placement assistance, and professional development. Our counselors help you identify your strengths, explore career paths, and achieve your professional goals.",
    image1: "/funding-success.jpg",
    image2: "/digital-launch.jpg",
    link: "/programs/career",
  },
  {
    id: "social-impact",
    title: "Social Impact Initiatives",
    shortTitle: "Social Impact",
    fullDescription:
      "Community service and social responsibility initiatives fostering youth participation in nation-building activities. Contribute to society through volunteering, awareness campaigns, and community development projects.",
    image1: "/funding-success.jpg",
    image2: "/global-partnership.jpg",
    link: "/programs/social-impact",
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
