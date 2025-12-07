"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Users, TrendingUp, Award, BookOpen } from "lucide-react"

const impacts = [
  {
    title: "Youth Benefited",
    value: "5,00,000+",
    subtitle: "Across all programs",
    icon: Users,
  },
  {
    title: "Placement Rate",
    value: "85%",
    subtitle: "Post-training employment",
    icon: TrendingUp,
  },
  {
    title: "Awards Won",
    value: "45+",
    subtitle: "National recognition",
    icon: Award,
  },
  {
    title: "Courses Offered",
    value: "200+",
    subtitle: "Diverse skill categories",
    icon: BookOpen,
  },
]

export function Impact() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Our <span className="text-primary">Impact</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Transforming lives and creating opportunities for millions of young Indians
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {impacts.map((impact, index) => {
            const IconComponent = impact.icon
            return (
              <Card key={index} className="text-center border-0 bg-background/50 backdrop-blur">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <IconComponent size={32} />
                    </div>
                  </div>
                  <CardTitle className="text-3xl font-bold text-primary">{impact.value}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="font-semibold text-foreground">{impact.title}</p>
                  <p className="text-sm text-muted-foreground">{impact.subtitle}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
