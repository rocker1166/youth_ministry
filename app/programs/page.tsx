"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const programDetails = [
  {
    id: 1,
    title: "Leadership Development Program",
    category: "Leadership",
    duration: "3-6 months",
    level: "Intermediate",
    description:
      "Comprehensive program developing leadership qualities, strategic thinking, and organizational management skills.",
    highlights: ["Team management", "Decision making", "Communication skills", "Strategic planning"],
    price: "Free",
  },
  {
    id: 2,
    title: "Digital Skills Certification",
    category: "Technology",
    duration: "2-4 months",
    level: "Beginner",
    description: "Industry-relevant digital literacy and coding skills for modern career opportunities.",
    highlights: ["Web development", "Data analysis", "Cloud computing", "Digital marketing"],
    price: "Free",
  },
  {
    id: 3,
    title: "Entrepreneurship Bootcamp",
    category: "Business",
    duration: "4-8 weeks",
    level: "All Levels",
    description: "Intensive mentorship program for aspiring entrepreneurs with access to funding and network.",
    highlights: ["Business planning", "Funding support", "Mentorship", "Networking"],
    price: "Free + Funding",
  },
  {
    id: 4,
    title: "Career Advancement Program",
    category: "Career",
    duration: "6 weeks",
    level: "Intermediate",
    description: "Professional development and job readiness training with placement assistance.",
    highlights: ["Resume building", "Interview prep", "Job placement", "Career counseling"],
    price: "Free",
  },
  {
    id: 5,
    title: "Social Impact Initiative",
    category: "Social",
    duration: "3 months",
    level: "All Levels",
    description: "Community service and CSR projects fostering social responsibility among youth.",
    highlights: ["Community work", "Sustainability", "Project management", "Impact assessment"],
    price: "Free",
  },
  {
    id: 6,
    title: "Global Exchange Program",
    category: "International",
    duration: "2-4 weeks",
    level: "Advanced",
    description: "International exposure through exchange programs and cultural immersion.",
    highlights: ["International travel", "Cultural exchange", "Language learning", "Global networking"],
    price: "Subsidized",
  },
]

export default function ProgramsPage() {
  return (
    <main className="min-h-screen">
        {/* Hero Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-5xl font-bold text-foreground mb-6">
              Our <span className="text-primary">Programs</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl text-balance">
              Explore our comprehensive range of youth development programs designed to build skills and create
              opportunities.
            </p>
          </div>
        </section>

        {/* Programs Grid */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {programDetails.map((program) => (
                <Card key={program.id} className="flex flex-col">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-4">
                      <Badge variant="secondary">{program.category}</Badge>
                      <span className="text-xs font-semibold px-2 py-1 bg-primary/10 text-primary rounded">
                        {program.level}
                      </span>
                    </div>
                    <CardTitle className="text-xl">{program.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-2">{program.duration}</p>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <p className="text-foreground/70 mb-4">{program.description}</p>
                    <div className="mb-6">
                      <p className="text-sm font-semibold mb-2">Key Topics:</p>
                      <ul className="space-y-1">
                        {program.highlights.map((highlight, i) => (
                          <li key={i} className="text-sm text-foreground/60 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex justify-between items-center mt-auto pt-4 border-t border-border">
                      <span className="font-semibold text-primary">{program.price}</span>
                      <Button size="sm" className="bg-primary hover:bg-primary/90">
                        Apply Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
  )
}
