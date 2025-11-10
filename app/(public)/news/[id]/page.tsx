"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, User, ArrowLeft, Clock, Tag, Share2 } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import rehypeSanitize from "rehype-sanitize"

// Dummy data for news articles with markdown content
const dummyNewsData: Record<string, any> = {
  "1": {
    id: "1",
    title: "New Digital Literacy Program Launched Across 50 Cities",
    slug: "digital-literacy-program-2024",
    excerpt: "Institute launches comprehensive digital skills training initiative to reach 100,000 youth across India.",
    category: "Program Launch",
    author: "Ministry of Youth Affairs",
    published_at: "2024-11-15T10:00:00Z",
    reading_time: "5 min read",
    featured_image: "/digital-launch.jpg",
    tags: ["Digital Literacy", "Education", "Technology"],
    content: `
# New Digital Literacy Program Launched Across 50 Cities

![Digital Literacy Workshop](/digital-launch.jpg)

The **Institute of Youth Affairs** is proud to announce the launch of its groundbreaking **Digital Literacy Program** across 50 major cities in India. This comprehensive initiative aims to equip **100,000 youth** with essential digital skills that will empower them in the modern workforce.

## Program Overview

Our Digital Literacy Program is designed to bridge the digital divide and provide equal opportunities to youth from all backgrounds. The program covers:

- **Web Development** - HTML, CSS, JavaScript, and modern frameworks
- **Data Analysis** - Excel, Python, SQL, and data visualization
- **Digital Marketing** - SEO, social media marketing, and content strategy
- **Cybersecurity Basics** - Online safety and data protection

### Key Features

1. **Free Training** - All courses are completely free for eligible youth
2. **Certification** - Industry-recognized certificates upon completion
3. **Job Placement Support** - Career counseling and job placement assistance
4. **Flexible Learning** - Both online and offline training modes available

## Impact Goals

> "Our mission is to ensure no young person is left behind in the digital revolution" - Director, Institute of Youth Affairs

The program targets:
- 100,000 trained youth by 2025
- 70% placement rate in tech-related jobs
- 50 training centers across India
- Partnerships with 100+ companies for placements

### Registration Process

Registration is now open! Follow these simple steps:

1. Visit our [Programs Page](/programs)
2. Fill out the application form
3. Attend the orientation session
4. Begin your learning journey

## Success Stories

We've already seen amazing results from our pilot program:

- **Priya Sharma** from Mumbai completed the Web Development course and landed a job at a leading tech startup
- **Rahul Verma** from Delhi used his data analysis skills to start his own consulting business
- **Anita Singh** from Bangalore became a certified digital marketing specialist

### Program Schedule

| Location | Start Date | Batch Size |
|----------|-----------|------------|
| Mumbai | December 1, 2024 | 2,000 |
| Delhi | December 5, 2024 | 2,500 |
| Bangalore | December 10, 2024 | 2,000 |
| Chennai | December 15, 2024 | 1,500 |

## Get Involved

Whether you're a student, a corporate partner, or a training volunteer, there are many ways to contribute to this initiative.

**Contact Information:**
- Email: digitalliteracy@iya.gov.in
- Phone: +91-11-XXXX-XXXX
- Website: www.iya.gov.in/digital-literacy

---

*This initiative is supported by the Ministry of Youth Affairs & Sports in collaboration with leading technology companies and educational institutions.*
    `,
  },
  "2": {
    id: "2",
    title: "Youth Leadership Summit 2024 - Record Participation of 5000",
    slug: "youth-leadership-summit-2024",
    excerpt: "Over 5,000 young leaders from across India participated in the annual summit discussing future opportunities.",
    category: "Event",
    author: "Events Team",
    published_at: "2024-11-10T09:00:00Z",
    reading_time: "7 min read",
    featured_image: "/summit-youth.jpg",
    tags: ["Leadership", "Summit", "Youth Development"],
    content: `
# Youth Leadership Summit 2024 - Record Participation

![Youth Leadership Summit 2024](/summit-youth.jpg)

The **Youth Leadership Summit 2024** concluded with unprecedented success, bringing together **5,000 young leaders** from every corner of India for three days of inspiration, learning, and networking.

## Event Highlights

This year's summit was the largest in our history, featuring:

### Day 1: Future of Work
- Keynote by tech industry leaders
- Panel discussions on AI and automation
- Interactive workshops on emerging technologies

### Day 2: Entrepreneurship & Innovation
- Startup pitch competitions
- Investor networking sessions
- Success stories from young entrepreneurs

### Day 3: Social Impact & Sustainability
- Sessions on climate action
- Community development projects
- Government scheme awareness programs

## Key Takeaways

Participants learned about:

- **Leadership Skills** - Communication, decision-making, and team building
- **Career Opportunities** - Emerging sectors and skill requirements
- **Networking** - Building professional connections across industries
- **Innovation** - Problem-solving and creative thinking

### Speaker Lineup

We were honored to host distinguished speakers including:

> "The future belongs to those who believe in the beauty of their dreams" - Featured Speaker, Tech Entrepreneur

![Workshop Session](/summit-workshop.jpg)

## Interactive Workshops

Over 50 workshops were conducted covering topics like:

- Public speaking and presentation skills
- Financial literacy and investment basics
- Mental health and wellness
- Coding bootcamps and hackathons

### Networking Impact

Participants made an average of 30+ meaningful connections, with many finding:
- Mentorship opportunities
- Internship offers
- Co-founder partnerships
- Job opportunities

## Award Winners

Special recognition to our outstanding participants:

1. **Best Innovation** - Smart Water Management System
2. **Social Impact Award** - Rural Education Initiative  
3. **Entrepreneurship Excellence** - Sustainable Fashion Startup

## Looking Ahead

Based on overwhelming positive feedback, we're planning:

- Regional summits in 10 cities
- Online masterclass series
- Leadership certification program
- Alumni network platform

### Testimonials

*"This summit changed my perspective on leadership. The connections I made here are invaluable!"* - Participant from Maharashtra

*"The workshops were incredibly practical and the speakers were truly inspiring."* - Participant from Karnataka

## Join Next Year

Registration for Youth Leadership Summit 2025 will open in January. Stay tuned!

📧 **Email:** summit@iya.gov.in  
📱 **Follow us:** @IYASummit on all social platforms

---

*Thank you to our sponsors, partners, and volunteers who made this event possible!*
    `,
  },
  "3": {
    id: "3",
    title: "Entrepreneurship Fund Reaches ₹10 Crore Milestone",
    slug: "entrepreneurship-fund-milestone",
    excerpt: "Celebrating successful disbursement of ₹10 crore to 500+ young entrepreneurs across various sectors.",
    category: "Achievement",
    author: "Entrepreneurship Division",
    published_at: "2024-11-05T11:00:00Z",
    reading_time: "6 min read",
    featured_image: "/funding-success.jpg",
    tags: ["Entrepreneurship", "Funding", "Startups"],
    content: `
# Entrepreneurship Fund Reaches ₹10 Crore Milestone

![Celebrating Success](/funding-success.jpg)

A major milestone achieved! The **Institute of Youth Affairs** has successfully disbursed **₹10 crore** in funding to over **500 young entrepreneurs**, creating thousands of jobs and contributing significantly to India's startup ecosystem.

## Fund Overview

Since its inception in 2022, our entrepreneurship fund has supported innovative startups across multiple sectors:

### Sector Distribution

| Sector | Startups Funded | Amount (₹ Cr) |
|--------|----------------|---------------|
| Technology | 150 | 3.5 |
| Agriculture | 100 | 2.0 |
| Healthcare | 80 | 1.8 |
| Education | 70 | 1.2 |
| Manufacturing | 60 | 1.0 |
| Others | 40 | 0.5 |

## Success Metrics

Our funded startups have achieved remarkable results:

- **2,500+ jobs created** directly by funded startups
- **75% survival rate** after 2 years (vs 50% industry average)
- **Average ROI of 3x** on initial investment
- **15 unicorn potentials** identified in the portfolio

### Featured Success Story: AgriTech Startup

![AgriTech Innovation](/agritech-success.jpg)

**GreenFarms Technologies**, funded with ₹15 lakhs in 2023, has now:
- Scaled to 10 states
- Impacted 5,000 farmers
- Generated ₹2 crore in annual revenue
- Raised Series A funding of ₹5 crore

## Application Process

Want to apply for funding? Here's how:

1. **Submit Application** - Online form with business plan
2. **Preliminary Review** - 2-week evaluation period
3. **Pitch Session** - Present to our investment committee
4. **Due Diligence** - 3-4 week verification process
5. **Funding Decision** - Notification within 6 weeks

### Eligibility Criteria

- Age: 18-35 years
- Indian citizen
- Innovative business idea
- Scalable model
- Social impact potential

## Types of Support

Beyond financial support, we provide:

### Mentorship Program
- One-on-one guidance from industry experts
- Quarterly review meetings
- Strategic planning support

### Networking Opportunities
- Investor meetups
- Industry connections
- Peer learning sessions

### Resource Access
- Co-working spaces
- Legal and accounting support
- Technology infrastructure

## What Entrepreneurs Say

> "The funding came at the perfect time. But more than money, the mentorship and network opened doors we didn't know existed." - Founder, EdTech Startup

> "They believed in our vision when no one else did. Today we're employing 50+ people and growing!" - Founder, HealthTech Startup

## Looking Forward

Our goals for the next 2 years:

- **Double the fund to ₹20 crore**
- Support **1,000 more startups**
- Launch **sector-specific accelerator programs**
- Partner with **international investors**

### Special Announcement

We're launching a **Women Entrepreneurship Fund** with a dedicated corpus of ₹5 crore to support women-led startups!

## Apply Now

Applications are open for Q1 2025 funding cycle!

**Deadline:** December 31, 2024  
**Apply at:** www.iya.gov.in/entrepreneurship-fund

📧 **Contact:** startups@iya.gov.in  
📞 **Helpline:** 1800-XXX-XXXX

---

*Building India's entrepreneurial future, one startup at a time.*
    `,
  },
}

// Recent updates (dummy data)
const recentUpdates = [
  {
    id: "4",
    title: "New Scholarship Program for Underprivileged Youth",
    category: "Announcement",
    published_at: "2024-11-01T10:00:00Z",
  },
  {
    id: "5",
    title: "International Partnership with Global Youth Organizations",
    category: "Partnership",
    published_at: "2024-10-28T10:00:00Z",
  },
  {
    id: "6",
    title: "Success Stories: From Training to Employment",
    category: "Success Story",
    published_at: "2024-10-20T10:00:00Z",
  },
]

export default function NewsDetailPage() {
  const params = useParams()
  const [newsData, setNewsData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call - replace with actual API call later
    const fetchNews = async () => {
      setLoading(true)
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500))
      
      const id = params.id as string
      const data = dummyNewsData[id]
      
      if (data) {
        setNewsData(data)
      }
      setLoading(false)
    }

    fetchNews()
  }, [params.id])

  if (loading) {
    return (
      <main className="min-h-screen py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </main>
    )
  }

  if (!newsData) {
    return (
      <main className="min-h-screen py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">News Article Not Found</h1>
          <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist.</p>
          <Link href="/news">
            <Button>
              <ArrowLeft className="mr-2" size={16} />
              Back to News
            </Button>
          </Link>
        </div>
      </main>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <main className="min-h-screen">
      {/* Breadcrumb & Back Button */}
      <section className="py-6 px-4 sm:px-6 lg:px-8 bg-muted/50 border-b">
        <div className="max-w-7xl mx-auto">
          <Link href="/news">
            <Button variant="ghost" className="gap-2 mb-4">
              <ArrowLeft size={16} />
              Back to News
            </Button>
          </Link>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <article className="bg-white rounded-lg shadow-sm">
                {/* Article Header */}
                <div className="p-8 pb-6 border-b">
                  <Badge className="mb-4">{newsData.category}</Badge>
                  <h1 className="text-4xl font-bold text-foreground mb-6">{newsData.title}</h1>
                  
                  <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <User size={16} />
                      <span>{newsData.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>{formatDate(newsData.published_at)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} />
                      <span>{newsData.reading_time}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  {newsData.tags && (
                    <div className="flex flex-wrap gap-2 mt-6">
                      {newsData.tags.map((tag: string) => (
                        <Badge key={tag} variant="outline" className="gap-1">
                          <Tag size={12} />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Article Content with Markdown */}
                <div className="p-8">
                  <div className="prose prose-lg max-w-none">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw, rehypeSanitize]}
                      components={{
                        h1: ({ children }) => (
                          <h1 className="text-3xl font-bold mt-8 mb-4 text-foreground">{children}</h1>
                        ),
                        h2: ({ children }) => (
                          <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">{children}</h2>
                        ),
                        h3: ({ children }) => (
                          <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">{children}</h3>
                        ),
                        p: ({ children }) => <p className="mb-4 text-foreground/80 leading-relaxed">{children}</p>,
                        ul: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>,
                        li: ({ children }) => <li className="text-foreground/80">{children}</li>,
                        blockquote: ({ children }) => (
                          <blockquote className="border-l-4 border-primary pl-4 italic my-6 text-foreground/70">
                            {children}
                          </blockquote>
                        ),
                        table: ({ children }) => (
                          <div className="overflow-x-auto my-6">
                            <table className="min-w-full divide-y divide-gray-200 border">{children}</table>
                          </div>
                        ),
                        thead: ({ children }) => <thead className="bg-muted">{children}</thead>,
                        tbody: ({ children }) => <tbody className="divide-y divide-gray-200">{children}</tbody>,
                        th: ({ children }) => (
                          <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">{children}</th>
                        ),
                        td: ({ children }) => (
                          <td className="px-4 py-3 text-sm text-foreground/80">{children}</td>
                        ),
                        img: ({ src, alt }) => (
                          <img src={src} alt={alt} className="rounded-lg my-6 w-full shadow-md" />
                        ),
                        a: ({ href, children }) => (
                          <a href={href} className="text-primary hover:underline font-medium">
                            {children}
                          </a>
                        ),
                        strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
                        code: ({ children }) => (
                          <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>
                        ),
                        hr: () => <hr className="my-8 border-t border-gray-200" />,
                      }}
                    >
                      {newsData.content}
                    </ReactMarkdown>
                  </div>
                </div>

                {/* Share Section */}
                <div className="p-8 pt-6 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">Share this article:</span>
                    <Button variant="outline" className="gap-2">
                      <Share2 size={16} />
                      Share
                    </Button>
                  </div>
                </div>
              </article>
            </div>

            {/* Sidebar - Recent Updates */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                  Recent Updates
                </h3>
                <div className="space-y-4">
                  {recentUpdates.map((article) => (
                    <Link key={article.id} href={`/news/${article.id}`}>
                      <Card className="hover:shadow-md transition-shadow cursor-pointer">
                        <CardContent className="pt-6">
                          <Badge variant="outline" className="mb-2 text-xs">
                            {article.category}
                          </Badge>
                          <h4 className="font-semibold text-foreground mb-2 line-clamp-2 text-sm">
                            {article.title}
                          </h4>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar size={12} />
                            {formatDate(article.published_at)}
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
                
                <Link href="/news">
                  <Button variant="outline" className="w-full mt-6">
                    View All News
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
