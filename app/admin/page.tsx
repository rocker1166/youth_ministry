"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { LogOut, Download, RefreshCwIcon } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { createClient } from "@supabase/supabase-js"
import { EventsTab } from "@/components/admin/events-tab"
import { NewsTab } from "@/components/admin/news-tab"
import { GalleryTab } from "@/components/admin/gallery-tab"
import { AnalyticsTab } from "@/components/admin/analytics-tab"
import { RegistrationDialog } from "@/components/admin/registration-dialog"

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
  const { toast } = useToast()
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
  const [selectedEventRegistrations, setSelectedEventRegistrations] = useState<any[]>([])
  const [loadingRegistrations, setLoadingRegistrations] = useState(false)
  const [registrationsDialogOpen, setRegistrationsDialogOpen] = useState(false)
  const [currentEventId, setCurrentEventId] = useState<string>("")
  const [currentEventTitle, setCurrentEventTitle] = useState<string>("")

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
    tags: [] as string[],
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
        toast({
          variant: "destructive",
          title: "Upload Failed",
          description: error.message,
        })
        return null
      }

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("file_store").getPublicUrl(data.path)

      return publicUrl
    } catch (err) {
      console.error("Upload error:", err)
      toast({
        variant: "destructive",
        title: "Upload Failed",
        description: "An error occurred while uploading the file.",
      })
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
        toast({
          title: "Success",
          description: "Event created successfully!",
        })
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
        toast({
          variant: "destructive",
          title: "Error",
          description: error.error || "Failed to create event",
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create event",
      })
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
        toast({
          title: "Success",
          description: "Event updated successfully!",
        })
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
    if (!confirm("Are you sure you want to delete this event? All registrations for this event will also be permanently deleted.")) return

    try {
      const res = await fetch(`/api/admin/events?id=${id}`, { method: "DELETE" })
      if (res.ok) {
        const data = await res.json()
        const registrationCount = data.deletedRegistrations || 0
        
        toast({
          title: "Event Deleted",
          description: registrationCount > 0 
            ? `Event and ${registrationCount} registration${registrationCount !== 1 ? 's' : ''} deleted successfully.`
            : "Event deleted successfully.",
        })
        fetchEvents()
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete event",
      })
    }
  }

  // Fetch event registrations
  const fetchEventRegistrations = async (eventId: string, eventTitle: string) => {
    setLoadingRegistrations(true)
    setRegistrationsDialogOpen(true)
    setCurrentEventId(eventId)
    setCurrentEventTitle(eventTitle)
    try {
      const res = await fetch(`/api/admin/events/${eventId}/registrations`)
      if (res.ok) {
        const data = await res.json()
        setSelectedEventRegistrations(data)
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch registrations",
        })
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch registrations",
      })
    } finally {
      setLoadingRegistrations(false)
    }
  }

  // Export registrations to CSV
  const exportRegistrations = async (eventId: string) => {
    try {
      const res = await fetch(`/api/admin/events/${eventId}/registrations`, {
        method: "POST",
      })
      if (res.ok) {
        const blob = await res.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `event-registrations-${eventId}.csv`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
        toast({
          title: "Success",
          description: "Registrations exported successfully!",
        })
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to export registrations",
      })
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
          slug: newsForm.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
          status: "published",
          published_at: new Date().toISOString(),
        }),
      })

      if (res.ok) {
        toast({
          title: "Success",
          description: "News article created successfully!",
        })
        setNewsForm({
          title: "",
          content: "",
          excerpt: "",
          category: "",
          featured_image: "",
          tags: [],
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
      toast({
        title: "Success",
        description: "News deleted successfully!",
      })
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
        toast({
          title: "Success",
          description: "Gallery item created successfully!",
        })
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
      toast({
        title: "Success",
        description: "Gallery item deleted successfully!",
      })
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
      toast({
        title: "Success",
        description: "File uploaded successfully!",
      })
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
            <EventsTab
              events={events}
              eventForm={eventForm}
              editingId={editingId}
              loading={loading}
              uploadingImage={uploadingImage}
              setEventForm={setEventForm}
              handleCreateEvent={handleCreateEvent}
              handleUpdateEvent={handleUpdateEvent}
              handleDeleteEvent={handleDeleteEvent}
              handleFileUpload={handleFileUpload}
              loadEventForEdit={loadEventForEdit}
              fetchEventRegistrations={fetchEventRegistrations}
              setEditingId={setEditingId}
            />
          </TabsContent>

          {/* News Tab */}
          <TabsContent value="news" className="space-y-6">
            <NewsTab
              news={news}
              newsForm={newsForm}
              loading={loading}
              uploadingImage={uploadingImage}
              setNewsForm={setNewsForm}
              handleCreateNews={handleCreateNews}
              handleDeleteNews={handleDeleteNews}
              handleFileUpload={handleFileUpload}
            />
          </TabsContent>

          {/* Gallery Tab */}
          <TabsContent value="gallery" className="space-y-6">
            <GalleryTab
              gallery={gallery}
              galleryForm={galleryForm}
              loading={loading}
              uploadingImage={uploadingImage}
              setGalleryForm={setGalleryForm}
              handleCreateGallery={handleCreateGallery}
              handleDeleteGallery={handleDeleteGallery}
              handleFileUpload={handleFileUpload}
            />
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Registered Users</h2>
                <Button onClick={fetchUsers} className="bg-primary hover:bg-primary-600">
                  <RefreshCwIcon className="h-4 w-4 mr-2" /> Refresh
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
            <AnalyticsTab analytics={analytics} />
          </TabsContent>
        </Tabs>

        {/* Event Registrations Dialog */}
        <RegistrationDialog
          open={registrationsDialogOpen}
          onOpenChange={setRegistrationsDialogOpen}
          loading={loadingRegistrations}
          registrations={selectedEventRegistrations}
          eventTitle={currentEventTitle}
          eventId={currentEventId}
          onExport={exportRegistrations}
        />
      </div>
    </div>
  )
}
