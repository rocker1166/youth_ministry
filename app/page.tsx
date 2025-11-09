"use client"

import { Hero } from "@/components/hero"
import { Programs } from "@/components/programs"
import { Impact } from "@/components/impact"
import { News } from "@/components/news"
import { CTA } from "@/components/cta"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Programs />
      <Impact />
      <News />
      <CTA />
    </div>
  )
}
