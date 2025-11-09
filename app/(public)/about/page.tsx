"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Target, Heart, Eye } from "lucide-react"

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: "Mission",
      description:
        "To develop the personality of Indian youth through holistic programs combining education, skill development, and character building.",
    },
    {
      icon: Eye,
      title: "Vision",
      description:
        "A prosperous India with empowered, skilled, and socially conscious youth leading development across all sectors.",
    },
    {
      icon: Heart,
      title: "Values",
      description: "Integrity, inclusivity, excellence, and commitment to youth empowerment and national development.",
    },
    {
      icon: Users,
      title: "Commitment",
      description:
        "Equal opportunities for all youth irrespective of background, ensuring accessibility across urban and rural areas.",
    },
  ]

  return (
    <main className="min-h-screen">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-center text-foreground mb-6">
              About the <span className="text-primary">Institute</span>
            </h1>
            <p className="text-xl text-center text-muted-foreground max-w-3xl mx-auto text-balance">
              Established as a premier national organization dedicated to youth development, the Institute of Youth
              Affairs works towards building a capable and confident generation of leaders.
            </p>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Core Values</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value, index) => {
                const IconComponent = value.icon
                return (
                  <Card key={index}>
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                        <IconComponent size={24} />
                      </div>
                      <CardTitle>{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-foreground/70">{value.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* History Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-4xl font-bold text-center text-foreground">Our Journey</h2>
            <div className="space-y-4 text-foreground/80">
              <p>
                The Institute of Youth Affairs has been instrumental in shaping the careers and personalities of
                millions of young Indians. Founded with a vision to empower youth, it has grown into a national
                institution with presence across all states.
              </p>
              <p>
                Through various programs spanning skill development, leadership training, entrepreneurship support, and
                social responsibility, the Institute has created pathways for youth to realize their potential and
                contribute meaningfully to national development.
              </p>
              <p>
                Today, as India marches towards becoming a developed nation, the Institute remains committed to ensuring
                that every young person, regardless of their background, has access to quality education and skill
                development opportunities.
              </p>
            </div>
          </div>
        </section>
      </main>
  )
}
