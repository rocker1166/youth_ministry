"use client"

import type React from "react"
import { Card } from "@/components/ui/card"
import { BarChart3, Users as UsersIcon, Calendar, Newspaper } from "lucide-react"

interface AnalyticsTabProps {
  analytics: {
    totalUsers: number
    totalEvents: number
    totalRegistrations: number
    publishedNews: number
  } | null
}

export function AnalyticsTab({ analytics }: AnalyticsTabProps) {
  if (!analytics) {
    return (
      <div className="text-center py-12">
        <p className="text-neutral-500">Loading analytics...</p>
      </div>
    )
  }

  const stats = [
    {
      title: "Total Users",
      value: analytics.totalUsers,
      icon: UsersIcon,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      title: "Total Events",
      value: analytics.totalEvents,
      icon: Calendar,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      title: "Total Registrations",
      value: analytics.totalRegistrations,
      icon: BarChart3,
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
    {
      title: "Published News",
      value: analytics.publishedNews,
      icon: Newspaper,
      color: "text-orange-600",
      bg: "bg-orange-100",
    },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="p-6">
              <div className="flex items-center gap-4">
                <div className={`${stat.bg} p-3 rounded-lg`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm text-neutral-600">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-bold mb-4">Overview</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between py-2 border-b">
            <span className="text-neutral-600">Average Registrations per Event</span>
            <span className="font-semibold">
              {analytics.totalEvents > 0
                ? (analytics.totalRegistrations / analytics.totalEvents).toFixed(1)
                : 0}
            </span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-neutral-600">User Engagement Rate</span>
            <span className="font-semibold">
              {analytics.totalUsers > 0
                ? ((analytics.totalRegistrations / analytics.totalUsers) * 100).toFixed(1)
                : 0}
              %
            </span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-neutral-600">Content Published</span>
            <span className="font-semibold">{analytics.publishedNews} Articles</span>
          </div>
        </div>
      </Card>
    </div>
  )
}
