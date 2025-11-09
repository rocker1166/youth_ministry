"use client"

import type React from "react"
import { Card } from "@/components/ui/card"
import { BarChart3, Users as UsersIcon, Calendar, Newspaper, TrendingUp } from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts"

interface AnalyticsTabProps {
  analytics: {
    totalUsers: number
    totalEvents: number
    totalRegistrations: number
    publishedNews: number
    monthlyRegistrations?: Array<{ month: string; registrations: number; events: number }>
    eventCategories?: Array<{ name: string; value: number }>
    weeklyActivity?: Array<{ day: string; users: number; registrations: number }>
    newsEngagement?: Array<{ category: string; articles: number; views: number; shares: number }>
  } | null
}

export function AnalyticsTab({ analytics }: AnalyticsTabProps) {
  // Color palette for pie chart
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#f97316']
  
  // Get data from analytics
  const monthlyRegistrations = analytics?.monthlyRegistrations || []
  const eventCategories = analytics?.eventCategories || []
  const weeklyActivity = analytics?.weeklyActivity || []
  const newsEngagement = analytics?.newsEngagement || []
  
  // Check if data is available and has non-zero values
  const hasMonthlyData = monthlyRegistrations.length > 0 && 
    monthlyRegistrations.some(item => item.registrations > 0 || item.events > 0)
    
  const hasEventCategories = eventCategories.length > 0 && 
    eventCategories.some(item => item.value > 0)
    
  const hasWeeklyData = weeklyActivity.length > 0 && 
    weeklyActivity.some(item => item.users > 0 || item.registrations > 0)
    
  const hasNewsEngagement = newsEngagement.length > 0 && 
    newsEngagement.some(item => item.views > 0 || item.shares > 0)

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

      {/* Monthly Registrations Trend */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-bold">Monthly Registration Trends</h3>
        </div>
        {hasMonthlyData ? (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyRegistrations}>
              <defs>
                <linearGradient id="colorRegistrations" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="registrations"
                stroke="#3b82f6"
                fillOpacity={1}
                fill="url(#colorRegistrations)"
                name="Registrations"
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[300px] flex items-center justify-center text-neutral-500">
            <div className="text-center">
              <Calendar className="h-12 w-12 mx-auto mb-2 text-neutral-300" />
              <p>No monthly registration data available</p>
            </div>
          </div>
        )}
      </Card>

      {/* Two column layout for charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Event Categories Distribution */}
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-6">Event Categories Distribution</h3>
          {hasEventCategories ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={eventCategories}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {eventCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-neutral-500">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 mx-auto mb-2 text-neutral-300" />
                <p>No event category data available</p>
                <p className="text-sm text-neutral-400 mt-1">Create events to see distribution</p>
              </div>
            </div>
          )}
        </Card>

        {/* Weekly Activity */}
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-6">Weekly User Activity</h3>
          {hasWeeklyData ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyActivity}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="users" fill="#3b82f6" name="Active Users" radius={[8, 8, 0, 0]} />
                <Bar dataKey="registrations" fill="#10b981" name="Registrations" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-neutral-500">
              <div className="text-center">
                <UsersIcon className="h-12 w-12 mx-auto mb-2 text-neutral-300" />
                <p>No weekly activity data available</p>
                <p className="text-sm text-neutral-400 mt-1">Data will appear after 7 days</p>
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* News Engagement Chart */}
      <Card className="p-6">
        <h3 className="text-lg font-bold mb-6">News Engagement by Category</h3>
        {hasNewsEngagement ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={newsEngagement}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="category" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="views"
                stroke="#8b5cf6"
                strokeWidth={2}
                dot={{ fill: "#8b5cf6", r: 4 }}
                name="Views"
              />
              <Line
                type="monotone"
                dataKey="shares"
                stroke="#f59e0b"
                strokeWidth={2}
                dot={{ fill: "#f59e0b", r: 4 }}
                name="Shares"
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[300px] flex items-center justify-center text-neutral-500">
            <div className="text-center">
              <Newspaper className="h-12 w-12 mx-auto mb-2 text-neutral-300" />
              <p>No news engagement data available</p>
              <p className="text-sm text-neutral-400 mt-1">Publish news articles to see engagement</p>
            </div>
          </div>
        )}
      </Card>

      {/* Events vs Registrations Comparison */}
      <Card className="p-6">
        <h3 className="text-lg font-bold mb-6">Events vs Registrations Over Time</h3>
        {hasMonthlyData ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyRegistrations}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Bar dataKey="events" fill="#ec4899" name="Events Created" radius={[8, 8, 0, 0]} />
              <Bar dataKey="registrations" fill="#06b6d4" name="Total Registrations" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[300px] flex items-center justify-center text-neutral-500">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 mx-auto mb-2 text-neutral-300" />
              <p>No events and registration data available</p>
              <p className="text-sm text-neutral-400 mt-1">Create events to track trends</p>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
