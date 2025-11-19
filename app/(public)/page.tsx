"use client"

import { Hero } from "@/components/hero"
import { Programs } from "@/components/programs"
import { Impact } from "@/components/impact"
import { News } from "@/components/news"
import { CTA } from "@/components/cta"
import UpcomingEvents from "@/components/upcoming-events"
import MinistryGrid from "@/components/ministry-grid"
import GalleryPreview from "@/components/gallery-preview"
import { PartnerMinistriesTicker } from "@/components/partner-ministries-ticker"
import { CampBanner } from "@/components/CampBanner"
import { CampPromoModal } from "@/components/CampPromoModal"

export default function Home() {
  return (
    <>
      <CampPromoModal />
      
      <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <Hero />

      {/* Camp Banner */}
      <CampBanner />

      {/* About Snippet Section */}
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              About the <span className="text-primary">Institute</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The Institute of Youth Affairs is a Digital India initiative dedicated to enhancing youth development
              through holistic personality development programs, skill enhancement, and career guidance across India.
            </p>
          </div>

          {/* Partner Ministries Ticker */}
          <PartnerMinistriesTicker />
        </div>
      </section>

      {/* Ministry/Initiatives Grid */}
      <MinistryGrid />

      {/* Upcoming Events Section */}
      <UpcomingEvents />

      {/* Programs Section */}
      <section className="bg-white">
        <Programs />
      </section>

      {/* News Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <News />
        </div>
      </section>

      {/* Gallery Preview */}
      <GalleryPreview />

      {/* Impact/Stats Section
      <section className="py-16 bg-primary-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <Impact />
        </div>
      </section>
      
      
      */}
      

      {/* CTA Section */}
      <CTA />
    </div>
    </>
  )
}