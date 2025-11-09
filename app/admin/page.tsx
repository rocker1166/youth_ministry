"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Plus, Edit2, Trash2, Download, BarChart3, Upload, X, Image as ImageIcon, LogOut } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert } from "@/components/ui/alert"
import { createClient } from "@supabase/supabase-js"

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface Event {
  id: string
  title: string
  description: string
  start_date: string
  end_date: string
  location: string
  category: string
  capacity: number
  registered_count: number
  status: string
  image_url?: string
  created_at: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [tab, setTab] = useState("events")
  const [loading, setLoading] = useState(false)
  const [events, setEvents] = useState<Event[]>([])
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
  const [uploadingImage, setUploadingImage] = useState(false)
  const [alertMessage, setAlertMessage] = useState<{ type: "success" | "error"; message: string } | null>(null)

  // Logout function
  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" })
      router.push("/admin/login")
      router.refresh()
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  // Event form state
  const [eventForm, setEventForm] = useState({
    title: "",
    description: "",
    start_date: "",
    end_date: "",
    location: "",
    category: "",
    capacity: "",
    image_url: "",
  })

  // News form state
  const [newsForm, setNewsForm] = useState({
    title: "",
    content: "",
    excerpt: "",
    category: "",
    featured_image: "",
  })

  // Gallery form state
  const [galleryForm, setGalleryForm] = useState({
    title: "",
    description: "",
    category: "",
    image_url: "",
  })

  // Fetch events on mount
  useEffect(() => {
    fetchEvents()
    fetchNews()
    fetchGallery()
  }, [])

  // Upload file to Supabase Storage
  const uploadFile = async (file: File, folder: string = "events"): Promise<string | null> => {
    try {
      setUploadingImage(true)
      const fileExt = file.name.split(".").pop()
      const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`

      const { data, error } = await supabase.storage.from("file_store").upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      })

      if (error) {
        console.error("Upload error:", error)
        setAlertMessage({ type: "error", message: `Upload failed: ${error.message}` })
        return null
      }

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("file_store").getPublicUrl(data.path)

      return publicUrl
    } catch (err) {
      console.error("Upload error:", err)
      setAlertMessage({ type: "error", message: "Upload failed" })
      return null
    } finally {
      setUploadingImage(false)
    }
  }

  const fetchEvents = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/admin/events?limit=100")
      if (res.ok) {
        const data = await res.json()
        setEvents(data)
      }
    } catch (err) {
      console.error("Failed to fetch events", err)
    } finally {
      setLoading(false)
    }
  }

  const fetchNews = async () => {
    try {
      const res = await fetch("/api/admin/news")
      if (res.ok) {
        const data = await res.json()
        setNews(data)
      }
    } catch (err) {
      console.error("Failed to fetch news", err)
    }
  }

  const fetchGallery = async () => {
    try {
      const res = await fetch("/api/admin/gallery")
      if (res.ok) {
        const data = await res.json()
        setGallery(data)
      }
    } catch (err) {
      console.error("Failed to fetch gallery", err)
    }
  }

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/admin/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...eventForm,
          capacity: Number.parseInt(eventForm.capacity),
          status: "upcoming",
        }),
      })

      if (res.ok) {
        setAlertMessage({ type: "success", message: "Event created successfully!" })
        setEventForm({
          title: "",
          description: "",
          start_date: "",
          end_date: "",
          location: "",
          category: "",
          capacity: "",
          image_url: "",
        })
        fetchEvents()
      } else {
        const error = await res.json()
        setAlertMessage({ type: "error", message: error.error || "Failed to create event" })
      }
    } catch (err) {
      setAlertMessage({ type: "error", message: "Failed to create event" })
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateEvent = async (id: string) => {
    setLoading(true)
    try {
      const res = await fetch("/api/admin/events", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...eventForm,
          id,
          capacity: Number.parseInt(eventForm.capacity),
        }),
      })

      if (res.ok) {
        setAlertMessage({ type: "success", message: "Event updated successfully!" })
        setEditingId(null)
        setEventForm({
          title: "",
          description: "",
          start_date: "",
          end_date: "",
          location: "",
          category: "",
          capacity: "",
          image_url: "",
        })
        fetchEvents()
      }
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteEvent = async (id: string) => {
    if (confirm("Are you sure you want to delete this event?")) {
      setLoading(true)
      try {
        await fetch(`/api/admin/events?id=${id}`, { method: "DELETE" })
        setAlertMessage({ type: "success", message: "Event deleted successfully!" })
        fetchEvents()
      } finally {
        setLoading(false)
      }
    }
  }

  const handleCreateNews = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/admin/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newsForm,
          slug: newsForm.title.toLowerCase().replace(/\s+/g, "-"),
          status: "published",
          published_at: new Date().toISOString(),
        }),
      })

      if (res.ok) {
        setAlertMessage({ type: "success", message: "News article created successfully!" })
        setNewsForm({
          title: "",
          content: "",
          excerpt: "",
          category: "",
          featured_image: "",
        })
        fetchNews()
      }
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteNews = async (id: string) => {
    if (confirm("Are you sure you want to delete this news article?")) {
      await fetch(`/api/admin/news?id=${id}`, { method: "DELETE" })
      setAlertMessage({ type: "success", message: "News deleted successfully!" })
      fetchNews()
    }
  }

  const handleCreateGallery = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(galleryForm),
      })

      if (res.ok) {
        setAlertMessage({ type: "success", message: "Gallery item created successfully!" })
        setGalleryForm({
          title: "",
          description: "",
          category: "",
          image_url: "",
        })
        fetchGallery()
      }
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteGallery = async (id: string) => {
    if (confirm("Are you sure you want to delete this gallery item?")) {
      await fetch(`/api/admin/gallery?id=${id}`, { method: "DELETE" })
      setAlertMessage({ type: "success", message: "Gallery item deleted successfully!" })
      fetchGallery()
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = e.target.files?.[0]
    if (!file) return

    const url = await uploadFile(file, type)
    if (url) {
      if (type === "events") {
        setEventForm({ ...eventForm, image_url: url })
      } else if (type === "news") {
        setNewsForm({ ...newsForm, featured_image: url })
      } else if (type === "gallery") {
        setGalleryForm({ ...galleryForm, image_url: url })
      }
      setAlertMessage({ type: "success", message: "File uploaded successfully!" })
    }
  }

  const loadEventForEdit = (event: Event) => {
    setEditingId(event.id)
    setEventForm({
      title: event.title,
      description: event.description || "",
      start_date: event.start_date ? new Date(event.start_date).toISOString().slice(0, 16) : "",
      end_date: event.end_date ? new Date(event.end_date).toISOString().slice(0, 16) : "",
      location: event.location || "",
      category: event.category || "",
      capacity: event.capacity?.toString() || "",
      image_url: event.image_url || "",
    })
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
    <div className="min-h-screen bg-neutral-100">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary">Admin Dashboard</h1>
            <p className="text-sm text-neutral-600">Institute of Youth Affairs</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-8">
        <div className="mb-6">
          <p className="text-neutral-600">Manage events, news, gallery, users and view analytics</p>
        </div>

        {/* Alert Messages */}
        {alertMessage && (
          <Alert
            variant={alertMessage.type === "error" ? "destructive" : "default"}
            className="mb-4"
          >
            <div className="flex justify-between items-center">
              <span>{alertMessage.message}</span>
              <Button variant="ghost" size="sm" onClick={() => setAlertMessage(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </Alert>
        )}

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
              <h2 className="text-2xl font-bold mb-4">
                {editingId ? "Edit Event" : "Create Event"}
              </h2>
              <form
                onSubmit={
                  editingId ? (e) => {
                    e.preventDefault()
                    handleUpdateEvent(editingId)
                  } : handleCreateEvent
                }
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium mb-2">Event Title *</label>
                  <Input
                    placeholder="Event Title"
                    value={eventForm.title}
                    onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description *</label>
                  <Textarea
                    placeholder="Event Description"
                    value={eventForm.description}
                    onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Start Date & Time *</label>
                    <Input
                      type="datetime-local"
                      value={eventForm.start_date}
                      onChange={(e) => setEventForm({ ...eventForm, start_date: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">End Date & Time *</label>
                    <Input
                      type="datetime-local"
                      value={eventForm.end_date}
                      onChange={(e) => setEventForm({ ...eventForm, end_date: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Location *</label>
                    <Input
                      placeholder="Location"
                      value={eventForm.location}
                      onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Category *</label>
                    <select
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      value={eventForm.category}
                      onChange={(e) => setEventForm({ ...eventForm, category: e.target.value })}
                      required
                      aria-label="Event Category"
                    >
                      <option value="">Select Category</option>
                      <option value="leadership">Leadership</option>
                      <option value="training">Training</option>
                      <option value="entrepreneurship">Entrepreneurship</option>
                      <option value="workshop">Workshop</option>
                      <option value="seminar">Seminar</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Capacity *</label>
                  <Input
                    placeholder="Capacity"
                    type="number"
                    value={eventForm.capacity}
                    onChange={(e) => setEventForm({ ...eventForm, capacity: e.target.value })}
                    required
                    min="1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Event Image</label>
                  <div className="flex gap-4 items-start">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, "events")}
                      disabled={uploadingImage}
                      className="flex-1"
                    />
                    {uploadingImage && <Loader2 className="animate-spin h-5 w-5" />}
                  </div>
                  {eventForm.image_url && (
                    <div className="mt-2 relative w-32 h-32">
                      <img
                        src={eventForm.image_url}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-1 right-1"
                        onClick={() => setEventForm({ ...eventForm, image_url: "" })}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  {editingId && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setEditingId(null)
                        setEventForm({
                          title: "",
                          description: "",
                          start_date: "",
                          end_date: "",
                          location: "",
                          category: "",
                          capacity: "",
                          image_url: "",
                        })
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                  <Button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-primary hover:bg-primary-600"
                  >
                    {loading ? <Loader2 className="animate-spin mr-2" /> : <Plus className="mr-2" />}
                    {editingId ? "Update Event" : "Create Event"}
                  </Button>
                </div>
              </form>
            </Card>

            {/* Events List */}
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">All Events ({events.length})</h3>
              <div className="space-y-4">
                {loading && events.length === 0 ? (
                  <div className="text-center py-8">
                    <Loader2 className="animate-spin h-8 w-8 mx-auto mb-2" />
                    <p>Loading events...</p>
                  </div>
                ) : events.length === 0 ? (
                  <p className="text-center text-neutral-500 py-8">No events yet. Create your first event!</p>
                ) : (
                  events.map((event) => (
                    <Card key={event.id} className="p-4">
                      <div className="flex gap-4">
                        {event.image_url && (
                          <img
                            src={event.image_url}
                            alt={event.title}
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                        )}
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-bold text-lg">{event.title}</h4>
                              <p className="text-sm text-neutral-600">{event.location}</p>
                              <p className="text-sm text-neutral-500">
                                {new Date(event.start_date).toLocaleDateString("en-IN")} •{" "}
                                {event.registered_count || 0}/{event.capacity} registered
                              </p>
                              <span className="inline-block mt-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full capitalize">
                                {event.category}
                              </span>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => loadEventForEdit(event)}
                              >
                                <Edit2 className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDeleteEvent(event.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </Card>
          </TabsContent>

          {/* News Tab */}
          <TabsContent value="news" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Create News Article</h2>
              <form onSubmit={handleCreateNews} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Article Title *</label>
                  <Input
                    placeholder="Article Title"
                    value={newsForm.title}
                    onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Content *</label>
                  <Textarea
                    placeholder="Article Content"
                    value={newsForm.content}
                    onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })}
                    rows={8}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Excerpt</label>
                  <Textarea
                    placeholder="Short summary (optional)"
                    value={newsForm.excerpt}
                    onChange={(e) => setNewsForm({ ...newsForm, excerpt: e.target.value })}
                    rows={2}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Category *</label>
                  <select
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    value={newsForm.category}
                    onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value })}
                    required
                    aria-label="News Category"
                  >
                    <option value="">Select Category</option>
                    <option value="announcement">Announcement</option>
                    <option value="update">Update</option>
                    <option value="achievement">Achievement</option>
                    <option value="event">Event Report</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Featured Image</label>
                  <div className="flex gap-4 items-start">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, "news")}
                      disabled={uploadingImage}
                      className="flex-1"
                    />
                    {uploadingImage && <Loader2 className="animate-spin h-5 w-5" />}
                  </div>
                  {newsForm.featured_image && (
                    <div className="mt-2 relative w-32 h-32">
                      <img
                        src={newsForm.featured_image}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-1 right-1"
                        onClick={() => setNewsForm({ ...newsForm, featured_image: "" })}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>

                <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary-600">
                  {loading ? <Loader2 className="animate-spin mr-2" /> : <Plus className="mr-2" />}
                  Create Article
                </Button>
              </form>
            </Card>

            {/* News List */}
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Published Articles ({news.length})</h3>
              <div className="space-y-4">
                {news.length === 0 ? (
                  <p className="text-center text-neutral-500 py-8">No news articles yet. Create your first article!</p>
                ) : (
                  news.map((article: any) => (
                    <Card key={article.id} className="p-4">
                      <div className="flex gap-4">
                        {article.featured_image && (
                          <img
                            src={article.featured_image}
                            alt={article.title}
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                        )}
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-bold text-lg">{article.title}</h4>
                              <p className="text-sm text-neutral-600 line-clamp-2">{article.excerpt}</p>
                              <span className="inline-block mt-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full capitalize">
                                {article.category}
                              </span>
                            </div>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteNews(article.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </Card>
          </TabsContent>

          {/* Gallery Tab */}
          <TabsContent value="gallery" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Upload Gallery Item</h2>
              <form onSubmit={handleCreateGallery} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title *</label>
                  <Input
                    placeholder="Title"
                    value={galleryForm.title}
                    onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <Textarea
                    placeholder="Description"
                    value={galleryForm.description}
                    onChange={(e) => setGalleryForm({ ...galleryForm, description: e.target.value })}
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Category *</label>
                  <select
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    value={galleryForm.category}
                    onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}
                    required
                    aria-label="Gallery Category"
                  >
                    <option value="">Select Category</option>
                    <option value="events">Events</option>
                    <option value="workshops">Workshops</option>
                    <option value="awards">Awards</option>
                    <option value="facilities">Facilities</option>
                    <option value="activities">Activities</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Upload Image/Video *</label>
                  <div className="flex gap-4 items-start">
                    <Input
                      type="file"
                      accept="image/*,video/*"
                      onChange={(e) => handleFileUpload(e, "gallery")}
                      disabled={uploadingImage}
                      className="flex-1"
                    />
                    {uploadingImage && <Loader2 className="animate-spin h-5 w-5" />}
                  </div>
                  {galleryForm.image_url && (
                    <div className="mt-2 relative w-48 h-48">
                      <img
                        src={galleryForm.image_url}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-1 right-1"
                        onClick={() => setGalleryForm({ ...galleryForm, image_url: "" })}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={loading || !galleryForm.image_url}
                  className="w-full bg-primary hover:bg-primary-600"
                >
                  {loading ? <Loader2 className="animate-spin mr-2" /> : <Upload className="mr-2" />}
                  Upload to Gallery
                </Button>
              </form>
            </Card>

            {/* Gallery Grid */}
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Gallery Items ({gallery.length})</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {gallery.length === 0 ? (
                  <p className="col-span-full text-center text-neutral-500 py-8">No gallery items yet. Upload your first photo!</p>
                ) : (
                  gallery.map((item: any) => (
                    <Card key={item.id} className="relative group">
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <div className="p-2">
                        <h4 className="font-medium text-sm truncate">{item.title}</h4>
                        <p className="text-xs text-neutral-500 capitalize">{item.category}</p>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleDeleteGallery(item.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </Card>
                  ))
                )}
              </div>
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
