"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Zap, Users, Briefcase, BookOpen, Heart, Globe } from "lucide-react"

const programs = [
  {
    id: 1,
    title: "Leadership Development",
    description:
      "Comprehensive programs to develop leadership qualities and decision-making skills in young professionals.",
    icon: Zap,
    color: "bg-primary/10 text-primary",
  },
  {
    id: 2,
    title: "Skill Enhancement",
    description:
      "Technical and soft skills training programs aligned with industry requirements and future job market.",
    icon: Briefcase,
    color: "bg-accent/10 text-accent",
  },
  {
    id: 3,
    title: "Entrepreneurship",
    description: "Mentorship and funding support for young entrepreneurs to turn their ideas into successful ventures.",
    icon: Users,
    color: "bg-green-100 text-green-700",
  },
  {
    id: 4,
    title: "Career Counseling",
    description: "Expert guidance for career planning, job placement assistance, and professional development.",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-700",
  },
  {
    id: 5,
    title: "Social Impact",
    description: "Community service and social responsibility initiatives fostering youth participation.",
    icon: Heart,
    color: "bg-red-100 text-red-700",
  },
  {
    id: 6,
    title: "Global Exchange",
    description: "International exposure and exchange programs to build global perspective and cultural awareness.",
    icon: Globe,
    color: "bg-purple-100 text-purple-700",
  },
]

export function Programs() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Our <span className="text-primary">Programs</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Comprehensive youth development programs designed to build skills, confidence, and opportunities
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program) => {
            const IconComponent = program.icon
            return (
              <Card key={program.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${program.color} flex items-center justify-center mb-4`}>
                    <IconComponent size={24} />
                  </div>
                  <CardTitle className="text-xl">{program.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-base text-foreground/70">{program.description}</CardDescription>
                  <Button variant="outline" className="w-full gap-2 bg-transparent">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
