"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Plus, Edit2, Trash2, Download, BarChart3 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function AdminDashboard() {
  const [tab, setTab] = useState("events")
  const [loading, setLoading] = useState(false)
  const [events, setEvents] = useState([])
  const [news, setNews] = useState([])
  const [gallery, setGallery] = useState([])
  const [users, setUsers] = useState([])
  const [analytics, setAnalytics] = useState<{
    totalUsers: number
    totalEvents: number
    totalRegistrations: number
    publishedNews: number
  } | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)

  // Event form state
  const [eventForm, setEventForm] = useState({
    title: "",
    description: "",
    start_date: "",
    end_date: "",
    location: "",
    category: "",
    capacity: "",
  })

  // News form state
  const [newsForm, setNewsForm] = useState({
    title: "",
    content: "",
    excerpt: "",
    category: "",
  })

  // Fetch events on mount
  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/events?limit=100")
      const data = await res.json()
      setEvents(data)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...eventForm, status: "upcoming" }),
      })

      if (res.ok) {
        setEventForm({
          title: "",
          description: "",
          start_date: "",
          end_date: "",
          location: "",
          category: "",
          capacity: "",
        })
        fetchEvents()
      }
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteEvent = async (id: string) => {
    if (confirm("Are you sure you want to delete this event?")) {
      await fetch(`/api/events/${id}`, { method: "DELETE" })
      fetchEvents()
    }
  }

  useEffect(() => {
    if (tab === "analytics") {
      fetchAnalytics()
    }
  }, [tab])

  const fetchAnalytics = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/admin/analytics")
      const data = await res.json()
      setAnalytics(data)
    } finally {
      setLoading(false)
    }
  }

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/admin/users")
      const data = await res.json()
      setUsers(data)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary">Admin Dashboard</h1>
          <p className="text-neutral-600">Manage events, news, gallery, users and view analytics</p>
        </div>

        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="news">News</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Create Event</h2>
              <form onSubmit={handleCreateEvent} className="space-y-4">
                <Input
                  placeholder="Event Title"
                  value={eventForm.title}
                  onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                  required
                />
                <Textarea
                  placeholder="Event Description"
                  value={eventForm.description}
                  onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                />
                <Input
                  type="datetime-local"
                  value={eventForm.start_date}
                  onChange={(e) => setEventForm({ ...eventForm, start_date: e.target.value })}
                  required
                />
                <Input
                  type="datetime-local"
                  value={eventForm.end_date}
                  onChange={(e) => setEventForm({ ...eventForm, end_date: e.target.value })}
                  required
                />
                <Input
                  placeholder="Location"
                  value={eventForm.location}
                  onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                />
                <Input
                  placeholder="Capacity"
                  type="number"
                  value={eventForm.capacity}
                  onChange={(e) => setEventForm({ ...eventForm, capacity: e.target.value })}
                />
                <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary-600">
                  {loading ? <Loader2 className="animate-spin" /> : <Plus />}
                  Create Event
                </Button>
              </form>
            </Card>

            {/* Events List */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Upcoming Events</h3>
              {events.map((event: any) => (
                <Card key={event.id} className="p-4 flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-lg">{event.title}</h4>
                    <p className="text-neutral-600">{event.location}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setEditingId(event.id)}>
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteEvent(event.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* News Tab */}
          <TabsContent value="news" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Create News Article</h2>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <Input
                  placeholder="Article Title"
                  value={newsForm.title}
                  onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                  required
                />
                <Textarea
                  placeholder="Article Content"
                  value={newsForm.content}
                  onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })}
                  rows={6}
                />
                <Textarea
                  placeholder="Excerpt"
                  value={newsForm.excerpt}
                  onChange={(e) => setNewsForm({ ...newsForm, excerpt: e.target.value })}
                  rows={2}
                />
                <Button className="w-full bg-primary hover:bg-primary-600">
                  <Plus /> Create Article
                </Button>
              </form>
            </Card>
          </TabsContent>

          {/* Gallery Tab */}
          <TabsContent value="gallery" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Upload Gallery Item</h2>
              <form className="space-y-4">
                <Input type="file" accept="image/*,video/*" />
                <Input placeholder="Title" />
                <Textarea placeholder="Description" />
                <Button className="w-full bg-primary hover:bg-primary-600">
                  <Plus /> Upload
                </Button>
              </form>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Registered Users</h2>
                <Button onClick={fetchUsers} className="bg-primary hover:bg-primary-600">
                  <Download className="h-4 w-4 mr-2" /> Refresh
                </Button>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>State</TableHead>
                      <TableHead>Joined</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user: any) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.phone || "N/A"}</TableCell>
                        <TableCell>{user.state || "N/A"}</TableCell>
                        <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            {analytics ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-neutral-600 text-sm">Total Users</p>
                      <p className="text-3xl font-bold text-primary">{analytics.totalUsers}</p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-primary opacity-50" />
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-neutral-600 text-sm">Total Events</p>
                      <p className="text-3xl font-bold text-primary">{analytics.totalEvents}</p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-primary opacity-50" />
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-neutral-600 text-sm">Total Registrations</p>
                      <p className="text-3xl font-bold text-primary">{analytics.totalRegistrations}</p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-primary opacity-50" />
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-neutral-600 text-sm">Published News</p>
                      <p className="text-3xl font-bold text-primary">{analytics.publishedNews}</p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-primary opacity-50" />
                  </div>
                </Card>
              </div>
            ) : (
              <Card className="p-6 text-center">
                <Loader2 className="animate-spin h-8 w-8 mx-auto mb-2" />
                <p>Loading analytics...</p>
              </Card>
            )}

            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Registration Trends</h3>
              <div className="h-64 bg-neutral-100 rounded flex items-center justify-center text-neutral-600">
                Chart will be rendered here with recharts
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
