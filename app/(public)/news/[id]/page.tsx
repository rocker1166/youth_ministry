"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, User, ArrowLeft, Clock, Tag, Share2, Copy, Check } from "lucide-react"
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

// Recent updates dummy fallback
const dummyRecentUpdates = [
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
  const [recentNews, setRecentNews] = useState<any[]>(dummyRecentUpdates)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true)
      
      try {
        const id = params.id as string
        const response = await fetch(`/api/news/${id}`)
        
        if (response.ok) {
          const data = await response.json()
          setNewsData(data)
        } else {
          // Fallback to dummy data if API fails
          const data = dummyNewsData[id]
          if (data) {
            setNewsData(data)
          }
        }
      } catch (error) {
        console.error('Error fetching news:', error)
        // Fallback to dummy data on error
        const data = dummyNewsData[params.id as string]
        if (data) {
          setNewsData(data)
        }
      }
      
      setLoading(false)
    }

    fetchNews()
  }, [params.id])

  // Fetch recent news for sidebar
  useEffect(() => {
    const fetchRecentNews = async () => {
      try {
        const response = await fetch('/api/news?limit=4')
        
        if (response.ok) {
          const data = await response.json()
          // Filter out current article and take only 3 items
          const filtered = data
            .filter((article: any) => article.id !== params.id)
            .slice(0, 3)
          
          if (filtered.length > 0) {
            setRecentNews(filtered)
          }
        }
      } catch (error) {
        console.error('Error fetching recent news:', error)
        // Keep dummy fallback data
      }
    }

    if (params.id) {
      fetchRecentNews()
    }
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

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareText = newsData ? `Check out this article: ${newsData.title}` : ''

  const handleWhatsAppShare = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`
    window.open(whatsappUrl, '_blank')
  }

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
    window.open(twitterUrl, '_blank')
  }

  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    window.open(facebookUrl, '_blank')
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
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
                    {newsData.author && (
                      <div className="flex items-center gap-2">
                        <User size={16} />
                        <span>{newsData.author}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>{formatDate(newsData.published_at)}</span>
                    </div>
                    {newsData.reading_time && (
                      <div className="flex items-center gap-2">
                        <Clock size={16} />
                        <span>{newsData.reading_time}</span>
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  {newsData.tags && Array.isArray(newsData.tags) && newsData.tags.length > 0 && (
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

                {/* Featured Image */}
                {newsData.featured_image && (
                  <div className="px-8 pb-8">
                    <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-md">
                      <img
                        src={newsData.featured_image}
                        alt={newsData.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}

                {/* Article Content with HTML rendering */}
                <div className="p-8 pt-0">
                  <div 
                    className="prose prose-lg max-w-none
                      [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mt-8 [&_h1]:mb-4
                      [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-4
                      [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-3
                      [&_p]:mb-4 [&_p]:leading-relaxed
                      [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul]:space-y-2
                      [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_ol]:space-y-2
                      [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-6
                      [&_table]:min-w-full [&_table]:divide-y [&_table]:divide-gray-200 [&_table]:border [&_table]:my-6
                      [&_thead]:bg-muted
                      [&_th]:px-4 [&_th]:py-3 [&_th]:text-left [&_th]:text-sm [&_th]:font-semibold
                      [&_td]:px-4 [&_td]:py-3 [&_td]:text-sm
                      [&_img]:rounded-lg [&_img]:my-6 [&_img]:w-full [&_img]:shadow-md
                      [&_a]:text-primary [&_a]:hover:underline [&_a]:font-medium
                      [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono
                      [&_pre]:bg-muted [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:my-6
                    "
                    dangerouslySetInnerHTML={{ __html: newsData.content }}
                  />
                </div>

                {/* Share Section */}
                <div className="p-8 pt-6 border-t">
                  <h3 className="text-sm font-medium text-foreground mb-4">Share this article:</h3>
                  <div className="flex flex-wrap items-center gap-3">
                    {/* WhatsApp Share */}
                    <Button 
                      variant="outline" 
                      className="gap-2 hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-colors"
                      onClick={handleWhatsAppShare}
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="currentColor"
                        className="shrink-0"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                      WhatsApp
                    </Button>

                    {/* Twitter Share */}
                    <Button 
                      variant="outline" 
                      className="gap-2 hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2] transition-colors"
                      onClick={handleTwitterShare}
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="currentColor"
                        className="shrink-0"
                      >
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                      Twitter
                    </Button>

                    {/* Facebook Share */}
                    <Button 
                      variant="outline" 
                      className="gap-2 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-colors"
                      onClick={handleFacebookShare}
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="currentColor"
                        className="shrink-0"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      Facebook
                    </Button>

                    {/* Copy Link */}
                    <Button 
                      variant="outline" 
                      className="gap-2"
                      onClick={handleCopyLink}
                    >
                      {copied ? (
                        <>
                          <Check size={16} className="text-green-600" />
                          <span className="text-green-600">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={16} />
                          Copy Link
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </article>
            </div>

            {/* Sidebar - Recent Updates */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h3 className="text-lg font-bold text-foreground mb-6">
                  Recent Updates
                </h3>
                <div className="space-y-4">
                  {recentNews.map((article) => (
                    <Link key={article.id} href={`/news/${article.id}`} className="block">
                      <Card className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-transparent hover:border-l-primary">
                        <CardContent className="p-4">
                          <Badge variant="outline" className="mb-2 text-xs">
                            {article.category}
                          </Badge>
                          <h4 className="font-semibold text-foreground mb-2 line-clamp-2 text-sm leading-snug">
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
                  <Button variant="outline" className="w-full mt-4">
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
