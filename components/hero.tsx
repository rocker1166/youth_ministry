"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
              <span className="text-sm font-semibold text-primary">Empowering India's Youth</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-balance text-foreground">
              Building <span className="text-primary">Leaders</span> for Tomorrow
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg text-balance">
              The Institute of Youth Affairs is dedicated to developing holistic personality development programs, skill
              enhancement, and career guidance for youth across India.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 gap-2">
                Apply for Programs <ArrowRight size={20} />
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              <div>
                <div className="text-3xl font-bold text-primary">50+</div>
                <p className="text-sm text-muted-foreground">Programs</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent">100K+</div>
                <p className="text-sm text-muted-foreground">Youth Trained</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">28</div>
                <p className="text-sm text-muted-foreground">States</p>
              </div>
            </div>
          </div>

          {/* Image Placeholder */}
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <img
                src="/youth-empowerment.jpg"
                alt="Youth empowerment"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
