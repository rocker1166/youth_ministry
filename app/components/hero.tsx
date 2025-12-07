"use client"

import { useState, useEffect } from "react"
import { Button } from "@/app/components/ui/button"
import { ArrowRight, Download, ExternalLink, Calendar, Newspaper } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { TypingText } from "./typing-text"

interface NewsArticle {
  id: string
  title: string
  slug?: string
  content: string
  excerpt: string
  featured_image: string
  category: string
  status: string
  published_at: string
  created_at: string
  author?: string
  tags?: string[]
}

export function Hero() {
  const [latestNews, setLatestNews] = useState<NewsArticle | null>(null)
  const [loadingNews, setLoadingNews] = useState(true)

  useEffect(() => {
    fetchLatestNews()
  }, [])

  const fetchLatestNews = async () => {
    try {
      const res = await fetch("/api/news?limit=1")
      if (res.ok) {
        const data = await res.json()
        if (data && data.length > 0) {
          setLatestNews(data[0])
        }
      }
    } catch (error) {
      console.error("Error fetching latest news:", error)
    } finally {
      setLoadingNews(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <section className="relative bg-gradient-to-r from-primary-50 via-white to-primary-50 overflow-hidden">
      {/* Background Pattern - Government Style */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-primary-200 rounded-full shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-sm font-semibold text-primary">Empowering India for Viksit and Swarnim Bharat</span>
            </div>

            {/* Main Heading - Government Style */}
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                <span className="block">Building</span>
                <span className="text-primary block">
                  <TypingText 
                    texts={["Leaders", "Innovators", "Changemakers", "Future"]}
                    typingSpeed={120}
                    deletingSpeed={80}
                    pauseDuration={2500}
                  />
                </span>
                <span className="block">In Science</span>
                <span className="block">For Tomorrow</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl">
                The Institute of Youth Affairs fosters scientific excellence through programs related to biotechnology and generalized science, empowering youth with knowledge and skills for India's scientific advancement.
              </p>
            </div>

            {/* CTA Buttons - Government Style */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="https://forms.gle/GzCzjRNEWe8Xo3VJ7" target="_blank">
                <Button size="lg" className="bg-primary hover:bg-primary-700 text-white shadow-lg hover:shadow-xl transition-all group w-full sm:w-auto">
                  Apply for Camp'25
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </Button>
              </Link>
              <Link href="/camp">
                <Button size="lg" variant="outline" className="border-2 border-gray-300 hover:border-primary hover:text-primary group w-full sm:w-auto">
                  Upcoming Events
                  <ExternalLink className="ml-2 group-hover:scale-110 transition-transform" size={18} />
                </Button>
              </Link>
            </div>

            {/* Quick Links - Government Portal Style */}
            <div className="flex flex-wrap gap-4 pt-6 text-sm">
              <a 
                href="/Brochure-Science Exhibtion, Institute of Youth Affairs 1.pdf" 
                download
                className="text-primary hover:underline font-medium flex items-center gap-1"
              >
                <Download size={16} />
                Science Exhibition Brochure
              </a>
              <span className="text-gray-300">|</span>
              <Link href="/camp" className="text-primary hover:underline font-medium">
                Upcoming Events
              </Link>
            </div>

            {/* Stats Row - UX4G Style */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t-2 border-gray-200">
              <div className="text-center sm:text-left">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">50+</div>
                <p className="text-sm text-gray-600 font-medium">Programs</p>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-3xl md:text-4xl font-bold text-green-600 mb-1">100K+</div>
                <p className="text-sm text-gray-600 font-medium">Youth Trained</p>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-1">28</div>
                <p className="text-sm text-gray-600 font-medium">States</p>
              </div>
            </div>

            {/* Latest News Card - Conditional Render */}
            {!loadingNews && latestNews && (
              <Link href={`/news/${latestNews.id}`} className="block">
                <div className="mt-8 bg-white/80 backdrop-blur-xl rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/20 hover:border-primary/30 group cursor-pointer">
                  <div className="flex flex-col sm:flex-row gap-4 p-4">
                    {/* News Image */}
                    <div className="relative w-full sm:w-32 h-32 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                      <Image
                        src={latestNews.featured_image || "/placeholder.svg"}
                        alt={latestNews.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    
                    {/* News Content */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Newspaper className="w-4 h-4 text-primary" />
                          <span className="inline-block px-2 py-0.5 text-xs font-semibold bg-primary/10 text-primary rounded-full">
                            {latestNews.category}
                          </span>
                          <span className="inline-block px-2 py-0.5 text-xs font-semibold bg-green-100 text-green-700 rounded-full">
                            Latest News
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          {latestNews.title}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                          {latestNews.excerpt}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Calendar size={12} />
                          {formatDate(latestNews.published_at)}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-primary font-semibold">
                          Read More
                          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )}
          </div>

          {/* Hero Image - Government Portal Style */}
          <div className="relative">
            {/* Main Image Container */}
            <div className=" ">
              <div className="aspect-[4/3]">
                <DotLottieReact
                  src="https://lottie.host/f0d1b15f-922c-4a83-af2a-3a9d7982350f/66Cgpf7FnI.lottie"
                  loop
                  autoplay
                  className="w-full h-full"
                />
              </div>
              {/* Overlay Badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-white shadow-md">
                    <img 
                      src="/logo/Logo.jpg" 
                      alt="Institute Logo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 mb-1">Institute of Youth Affairs</p>
                    <p className="text-xs text-gray-600">Scientific Programs & Youth Development</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave - Government Style */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 48h1440V0s-360 48-720 48S0 0 0 0v48z" fill="white"/>
        </svg>
      </div>
    </section>
  )
}
