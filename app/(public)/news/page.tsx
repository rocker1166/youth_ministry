"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Calendar, User, ArrowRight, Loader2, Newspaper } from "lucide-react"
import { Button } from "@/app/components/ui/button"

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

// Dummy fallback data
const dummyNews: NewsArticle[] = 
[
  {
    id: "1",
    title: "New Digital Literacy Program Launched Across 50 Cities",
    excerpt: "Institute launches comprehensive digital skills training initiative to reach 100,000 youth across India.",
    content:
      "The Institute of Youth Affairs is proud to announce the launch of its new Digital Literacy Program across 50 major cities. This initiative aims to equip 100,000 youth with essential digital skills including web development, data analysis, and digital marketing.",
    published_at: "2024-11-15T10:00:00Z",
    category: "Program Launch",
    featured_image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800",
    status: "published",
    created_at: "2024-11-15T10:00:00Z",
    author: "Ministry of Youth Affairs",
    tags: ["Digital Literacy", "Education", "Technology", "Youth Development"],
  },
  {
    id: "2",
    title: "Youth Leadership Summit 2024 - Record Participation of 5000",
    excerpt:
      "Over 5,000 young leaders from across India participated in the annual summit discussing future opportunities.",
    content:
      "The annual Youth Leadership Summit brought together 5,000 young leaders from across the country to discuss emerging opportunities in technology, entrepreneurship, and public service. The event featured keynote speeches from industry leaders and interactive workshops.",
    published_at: "2024-11-10T10:00:00Z",
    category: "Event",
    featured_image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
    status: "published",
    created_at: "2024-11-10T10:00:00Z",
    author: "Events Team",
    tags: ["Leadership", "Summit", "Networking", "Youth"],
  },
  {
    id: "3",
    title: "Entrepreneurship Fund Reaches ₹10 Crore Milestone",
    excerpt: "Celebrating successful disbursement of ₹10 crore to 500+ young entrepreneurs across various sectors.",
    content:
      "A major milestone achieved as the Institute disburses its 10 crore rupee mark in funding to young entrepreneurs. Over 500 startups have received support, creating thousands of jobs and contributing to the digital economy.",
    published_at: "2024-11-05T10:00:00Z",
    category: "Achievement",
    featured_image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800",
    status: "published",
    created_at: "2024-11-05T10:00:00Z",
    author: "Entrepreneurship Division",
    tags: ["Entrepreneurship", "Funding", "Startups", "Achievement"],
  },
  {
    id: "4",
    title: "New Scholarship Program for Underprivileged Youth",
    excerpt: "Institute announces comprehensive scholarship program with 10,000 seats for underprivileged youth.",
    content:
      "Expanding our commitment to inclusive development, the Institute announces a new scholarship program offering full support to 10,000 underprivileged youth from across the country for various skill development courses.",
    published_at: "2024-11-01T10:00:00Z",
    category: "Announcement",
    featured_image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800",
    status: "published",
    created_at: "2024-11-01T10:00:00Z",
    author: "Scholarship Committee",
    tags: ["Scholarship", "Education", "Social Impact", "Opportunity"],
  },
  {
    id: "5",
    title: "International Partnership with Global Youth Organizations",
    excerpt: "Institute partners with leading international organizations to expand global exchange opportunities.",
    content:
      "New international partnerships bring exciting opportunities for Indian youth to participate in global exchange programs and develop international networks. These partnerships open doors to internships and training programs worldwide.",
    published_at: "2024-10-28T10:00:00Z",
    category: "Partnership",
    featured_image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800",
    status: "published",
    created_at: "2024-10-28T10:00:00Z",
    author: "International Relations",
    tags: ["Partnership", "International", "Exchange Program", "Global"],
  },
  {
    id: "6",
    title: "Success Stories: From Training to Employment",
    excerpt: "Inspiring stories of youth who transformed their careers through our programs.",
    content:
      "Discover how thousands of youth have leveraged our programs to secure meaningful employment and start successful ventures. Their success stories inspire us to continue our mission of empowering the next generation.",
    published_at: "2024-10-20T10:00:00Z",
    category: "Success Story",
    featured_image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800",
    status: "published",
    created_at: "2024-10-20T10:00:00Z",
    author: "Communications Team",
    tags: ["Success Story", "Employment", "Career", "Inspiration"],
  },
]

export default function NewsPage() {
  const [news, setNews] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    try {
      const res = await fetch("/api/news?limit=20")
      if (res.ok) {
        const data = await res.json()
        // Sort by created_at date (most recent first)
        const sortedData = data.length > 0 
          ? data.sort((a: NewsArticle, b: NewsArticle) => 
              new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
            )
          : []
        setNews(sortedData)
      } else {
        setNews([])
      }
    } catch (error) {
      console.error("Error fetching news:", error)
      setNews([])
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

  // Organize news: most recent = featured, next 3 = sidebar, all = grid
  const featuredNews = news.length > 0 ? news[0] : null
  const recentNews = news.length > 1 ? news.slice(1, 4) : []
  const allNews = news

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin h-12 w-12 text-primary" />
      </div>
    )
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-foreground mb-4">Latest News & Updates</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay informed with the latest announcements, program launches, and success stories
          </p>
        </div>
      </section>

      {/* Empty State Banner */}
      {!loading && news.length === 0 ? (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-xl p-12 text-center border border-white/20">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-full mb-6">
                <Newspaper className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-3">No News Available Yet</h2>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                We haven't published any news articles yet. Check back soon for the latest updates, announcements, and success stories from the Institute of Youth Affairs.
              </p>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-blue-500/10 px-6 py-3 rounded-lg border border-primary/20">
                <Calendar className="w-5 h-5 text-primary" />
                <span className="text-sm font-semibold text-foreground">Stay tuned for upcoming announcements</span>
              </div>
            </div>
          </div>
        </section>
      ) : (
        /* News Grid */
        <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Featured News (Large) - Most Recent Article */}
            {featuredNews && (
              <div className="lg:col-span-2">
                <Link href={`/news/${featuredNews.id}`}>
                  <Card className="overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="h-64 bg-muted overflow-hidden">
                      <img
                        src={featuredNews.featured_image || "/placeholder.svg"}
                        alt={featuredNews.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                    <CardHeader className="flex-1">
                      <div className="flex items-center gap-2 mb-4">
                        <Badge className="bg-primary">{featuredNews.category}</Badge>
                        <Badge variant="outline" className="text-xs">Latest</Badge>
                      </div>
                      <CardTitle className="text-2xl mb-4">{featuredNews.title}</CardTitle>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar size={16} />
                          {formatDate(featuredNews.published_at)}
                        </div>
                        {featuredNews.author && (
                          <div className="flex items-center gap-1">
                            <User size={16} />
                            {featuredNews.author}
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-foreground/70 mb-6">{featuredNews.excerpt}</p>
                      <Button className="gap-2 bg-primary hover:bg-primary/90">
                        Read Full Article <ArrowRight size={18} />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            )}

            {/* Recent News Sidebar - Next 3 Most Recent */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-foreground mb-6">Recent Updates</h3>
              <div className="space-y-4">
                {recentNews.map((article) => (
                  <Link key={article.id} href={`/news/${article.id}`} className="block">
                    <Card className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-transparent hover:border-l-primary">
                      <CardContent className="p-4">
                        <Badge variant="outline" className="mb-2 text-xs">{article.category}</Badge>
                        <h4 className="font-semibold text-foreground mb-2 line-clamp-2 text-sm leading-snug">{article.title}</h4>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar size={12} />
                          {formatDate(article.published_at)}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* All News - Sorted by Creation Date (Most Recent First) */}
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">All News</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {allNews.map((article) => (
                <Link key={article.id} href={`/news/${article.id}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-all flex flex-col h-full cursor-pointer border-l-4 border-l-transparent hover:border-l-primary">
                    <div className="h-48 bg-muted overflow-hidden">
                      <img
                        src={article.featured_image || "/placeholder.svg"}
                        alt={article.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="secondary" className="text-xs capitalize">
                          {article.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar size={12} />
                          {formatDate(article.published_at)}
                        </span>
                      </div>
                      <CardTitle className="text-lg line-clamp-2 leading-snug">{article.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col pt-0">
                      <p className="text-sm text-foreground/70 mb-4 line-clamp-3 flex-1 leading-relaxed">{article.excerpt}</p>
                      {article.author && (
                        <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1">
                          <User size={12} />
                          {article.author}
                        </p>
                      )}
                      <Button variant="ghost" className="gap-2 text-primary hover:text-primary/90 w-fit p-0 h-auto">
                        Read More <ArrowRight size={16} />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      )}
    </main>
  )
}