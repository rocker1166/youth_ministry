"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const allNews = [
  {
    id: 1,
    title: "New Digital Literacy Program Launched Across 50 Cities",
    excerpt: "Institute launches comprehensive digital skills training initiative to reach 100,000 youth across India.",
    content:
      "The Institute of Youth Affairs is proud to announce the launch of its new Digital Literacy Program across 50 major cities. This initiative aims to equip 100,000 youth with essential digital skills including web development, data analysis, and digital marketing.",
    date: "November 15, 2024",
    author: "Ministry of Youth Affairs",
    category: "Program Launch",
    image: "/digital-launch.jpg",
  },
  {
    id: 2,
    title: "Youth Leadership Summit 2024 - Record Participation of 5000",
    excerpt:
      "Over 5,000 young leaders from across India participated in the annual summit discussing future opportunities.",
    content:
      "The annual Youth Leadership Summit brought together 5,000 young leaders from across the country to discuss emerging opportunities in technology, entrepreneurship, and public service. The event featured keynote speeches from industry leaders and interactive workshops.",
    date: "November 10, 2024",
    author: "Events Team",
    category: "Event",
    image: "/summit-youth.jpg",
  },
  {
    id: 3,
    title: "Entrepreneurship Fund Reaches ₹10 Crore Milestone",
    excerpt: "Celebrating successful disbursement of ₹10 crore to 500+ young entrepreneurs across various sectors.",
    content:
      "A major milestone achieved as the Institute disburses its 10 crore rupee mark in funding to young entrepreneurs. Over 500 startups have received support, creating thousands of jobs and contributing to the digital economy.",
    date: "November 5, 2024",
    author: "Entrepreneurship Division",
    category: "Achievement",
    image: "/funding-success.jpg",
  },
  {
    id: 4,
    title: "New Scholarship Program for Underprivileged Youth",
    excerpt: "Institute announces comprehensive scholarship program with 10,000 seats for underprivileged youth.",
    content:
      "Expanding our commitment to inclusive development, the Institute announces a new scholarship program offering full support to 10,000 underprivileged youth from across the country for various skill development courses.",
    date: "November 1, 2024",
    author: "Scholarship Committee",
    category: "Announcement",
    image: "/scholarship-program.jpg",
  },
  {
    id: 5,
    title: "International Partnership with Global Youth Organizations",
    excerpt: "Institute partners with leading international organizations to expand global exchange opportunities.",
    content:
      "New international partnerships bring exciting opportunities for Indian youth to participate in global exchange programs and develop international networks. These partnerships open doors to internships and training programs worldwide.",
    date: "October 28, 2024",
    author: "International Relations",
    category: "Partnership",
    image: "/global-partnership.jpg",
  },
  {
    id: 6,
    title: "Success Stories: From Training to Employment",
    excerpt: "Inspiring stories of youth who transformed their careers through our programs.",
    content:
      "Discover how thousands of youth have leveraged our programs to secure meaningful employment and start successful ventures. Their success stories inspire us to continue our mission of empowering the next generation.",
    date: "October 20, 2024",
    author: "Communications Team",
    category: "Success Story",
    image: "/success-stories.jpg",
  },
]

export default function NewsPage() {
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

        {/* News Grid */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Featured News (Large) */}
              <div className="lg:col-span-2">
                <Card className="overflow-hidden h-full flex flex-col">
                  <div className="h-64 bg-muted overflow-hidden">
                    <img
                      src={allNews[0].image || "/placeholder.svg"}
                      alt={allNews[0].title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader className="flex-1">
                    <div className="flex items-center gap-2 mb-4">
                      <Badge className="bg-primary">{allNews[0].category}</Badge>
                    </div>
                    <CardTitle className="text-2xl mb-4">{allNews[0].title}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar size={16} />
                        {allNews[0].date}
                      </div>
                      <div className="flex items-center gap-1">
                        <User size={16} />
                        {allNews[0].author}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/70 mb-6">{allNews[0].content}</p>
                    <Button className="gap-2 bg-primary hover:bg-primary/90">
                      Read Full Article <ArrowRight size={18} />
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Recent News Sidebar */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-foreground mb-6">Recent Updates</h3>
                {allNews.slice(1, 4).map((article) => (
                  <Card key={article.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <p className="text-xs font-semibold text-primary mb-2">{article.category}</p>
                      <h4 className="font-semibold text-foreground mb-2 line-clamp-2">{article.title}</h4>
                      <p className="text-xs text-muted-foreground">{article.date}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* All News */}
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-foreground mb-8">All News</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {allNews.map((article) => (
                  <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
                    <div className="h-40 bg-muted overflow-hidden">
                      <img
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {article.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar size={12} />
                          {article.date}
                        </span>
                      </div>
                      <CardTitle className="text-lg">{article.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <p className="text-sm text-foreground/70 mb-4">{article.excerpt}</p>
                      <Button variant="ghost" className="gap-2 text-primary hover:text-primary/90">
                        Read More <ArrowRight size={16} />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
  )
}
