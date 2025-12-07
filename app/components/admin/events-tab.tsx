"use client"

import type React from "react"
import { Card } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Textarea } from "@/app/components/ui/textarea"
import { Loader2, Plus, Edit2, Trash2, X, Users as UsersIcon } from "lucide-react"

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

interface EventsTabProps {
  events: Event[]
  eventForm: {
    title: string
    description: string
    start_date: string
    end_date: string
    location: string
    category: string
    capacity: string
    image_url: string
  }
  editingId: string | null
  loading: boolean
  uploadingImage: boolean
  setEventForm: (form: any) => void
  handleCreateEvent: (e: React.FormEvent) => Promise<void>
  handleUpdateEvent: (id: string) => Promise<void>
  handleDeleteEvent: (id: string) => Promise<void>
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>, type: string) => Promise<void>
  loadEventForEdit: (event: Event) => void
  fetchEventRegistrations: (eventId: string, eventTitle: string) => Promise<void>
  setEditingId: (id: string | null) => void
}

export function EventsTab({
  events,
  eventForm,
  editingId,
  loading,
  uploadingImage,
  setEventForm,
  handleCreateEvent,
  handleUpdateEvent,
  handleDeleteEvent,
  handleFileUpload,
  loadEventForEdit,
  fetchEventRegistrations,
  setEditingId,
}: EventsTabProps) {
  return (
    <div className="space-y-6">
      {/* Create/Edit Event Form */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">{editingId ? "Edit Event" : "Create New Event"}</h2>
        <form
          onSubmit={
            editingId
              ? async (e) => {
                  e.preventDefault()
                  await handleUpdateEvent(editingId)
                }
              : handleCreateEvent
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

          <div className="grid md:grid-cols-2 gap-4">
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

          <div className="grid md:grid-cols-2 gap-4">
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
              className="bg-primary hover:bg-primary-600"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  {editingId ? "Updating..." : "Creating..."}
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  {editingId ? "Update Event" : "Create Event"}
                </>
              )}
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
                          <span className="font-semibold text-primary">
                            {event.registered_count || 0}/{event.capacity}
                          </span>{" "}
                          registered
                        </p>
                        <span className="inline-block mt-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full capitalize">
                          {event.category}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => fetchEventRegistrations(event.id, event.title)}
                          title="View Registrations"
                        >
                          <UsersIcon className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => loadEventForEdit(event)}
                          title="Edit Event"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteEvent(event.id)}
                          title="Delete Event"
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
    </div>
  )
}
