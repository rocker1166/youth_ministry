"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, FileText, Book, Video } from "lucide-react"

const resources = [
  {
    id: 1,
    title: "Youth Career Guidelines 2024",
    description: "Comprehensive guide for career planning and professional development",
    category: "Guidelines",
    icon: FileText,
    download: true,
  },
  {
    id: 2,
    title: "Skill Development Handbook",
    description: "Complete resource for skill assessment and training programs",
    category: "Handbook",
    icon: Book,
    download: true,
  },
  {
    id: 3,
    title: "Entrepreneurship Toolkit",
    description: "Tools and templates for starting and managing a business",
    category: "Toolkit",
    icon: FileText,
    download: true,
  },
  {
    id: 4,
    title: "Leadership Development Videos",
    description: "Video series on essential leadership competencies",
    category: "Video",
    icon: Video,
    download: false,
  },
  {
    id: 5,
    title: "Digital Literacy Guide",
    description: "Step-by-step guide to essential digital skills",
    category: "Guide",
    icon: Book,
    download: true,
  },
  {
    id: 6,
    title: "Program Application Templates",
    description: "Ready-to-use templates for program applications",
    category: "Templates",
    icon: FileText,
    download: true,
  },
]

export default function ResourcesPage() {
  return (
    <main className="min-h-screen">
        {/* Hero Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-foreground mb-4">Resources</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Access free guides, toolkits, and learning materials to support your journey
            </p>
          </div>
        </section>

        {/* Resources Grid */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.map((resource) => {
                const IconComponent = resource.icon
                return (
                  <Card key={resource.id} className="flex flex-col">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                          <IconComponent size={24} />
                        </div>
                        <span className="text-xs font-semibold px-2 py-1 bg-primary/10 text-primary rounded">
                          {resource.category}
                        </span>
                      </div>
                      <CardTitle>{resource.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      <p className="text-foreground/70 mb-6">{resource.description}</p>
                      {resource.download ? (
                        <Button className="w-full bg-primary hover:bg-primary/90 gap-2">
                          <Download size={18} />
                          Download
                        </Button>
                      ) : (
                        <Button variant="outline" className="w-full gap-2 bg-transparent">
                          <Video size={18} />
                          Watch Now
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>
      </main>
  )
}
