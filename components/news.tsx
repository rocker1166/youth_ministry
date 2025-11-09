"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowRight } from "lucide-react"

const newsItems = [
  {
    id: 1,
    title: "New Digital Literacy Program Launched",
    description:
      "Institute launches comprehensive digital skills training initiative to reach 100,000 youth across India.",
    date: "November 15, 2024",
    category: "Program Launch",
    image: "/digital-training.jpg",
  },
  {
    id: 2,
    title: "Youth Leadership Summit 2024 - Record Participation",
    description:
      "Over 5,000 young leaders from across India participated in the annual summit discussing future opportunities.",
    date: "November 10, 2024",
    category: "Event",
    image: "/youth-summit.jpg",
  },
  {
    id: 3,
    title: "Entrepreneurship Fund Reaches ₹10 Crore Milestone",
    description: "Celebrating successful disbursement of ₹10 crore to 500+ young entrepreneurs across various sectors.",
    date: "November 5, 2024",
    category: "Achievement",
    image: "/entrepreneurship-success.jpg",
  },
]

export function News() {
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
          <Button variant="outline" className="hidden md:flex gap-2 bg-transparent">
            View All News <ArrowRight size={20} />
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {newsItems.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
              <div className="w-full h-48 bg-muted overflow-hidden">
                <img
                  src={item.image || "/placeholder.svg"}
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
                  {item.date}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground/70 mb-4 line-clamp-2">{item.description}</p>
                <Button variant="ghost" className="w-full gap-2 text-primary hover:text-primary/90">
                  Read More <ArrowRight size={16} />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button className="w-full md:hidden mt-8 bg-primary hover:bg-primary/90">View All News</Button>
      </div>
    </section>
  )
}
