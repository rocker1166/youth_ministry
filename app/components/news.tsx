"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Calendar, ArrowRight } from "lucide-react"

interface NewsArticle {
  id: string
  title: string
  excerpt: string
  featured_image: string
  category: string
  published_at: string
  created_at: string
}

export function News() {
  const [newsItems, setNewsItems] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    try {
      const res = await fetch("/api/news?limit=3")
      if (res.ok) {
        const data = await res.json()
        setNewsItems(data || [])
      }
    } catch (error) {
      console.error("Error fetching news:", error)
      setNewsItems([])
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Don't render section if no news available
  if (!loading && newsItems.length === 0) {
    return null
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Latest <span className="text-primary">News</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl text-balance">
              Stay updated with our latest announcements and initiatives
            </p>
          </div>
          <Link href="/news">
            <Button variant="outline" className="hidden md:flex gap-2 bg-transparent">
              View All News <ArrowRight size={20} />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {newsItems.map((item) => (
            <Link key={item.id} href={`/news/${item.id}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full cursor-pointer">
                <div className="w-full h-48 bg-muted overflow-hidden">
                  <img
                    src={item.featured_image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader className="flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full">
                      {item.category}
                    </span>
                  </div>
                  <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
                  <CardDescription className="text-xs text-muted-foreground flex items-center gap-1 mt-2">
                    <Calendar size={14} />
                    {formatDate(item.published_at)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground/70 mb-4 line-clamp-2">{item.excerpt}</p>
                  <Button variant="ghost" className="w-full gap-2 text-primary hover:text-primary/90">
                    Read More <ArrowRight size={16} />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <Link href="/news">
          <Button className="w-full md:hidden mt-8 bg-primary hover:bg-primary/90">
            View All News
          </Button>
        </Link>
      </div>
    </section>
  )
}
