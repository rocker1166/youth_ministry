"use client"

import type React from "react"
import { Card } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Textarea } from "@/app/components/ui/textarea"
import { Loader2, Plus, Trash2, X } from "lucide-react"

interface GalleryTabProps {
  gallery: any[]
  galleryForm: {
    title: string
    description: string
    category: string
    image_url: string
  }
  loading: boolean
  uploadingImage: boolean
  setGalleryForm: (form: any) => void
  handleCreateGallery: (e: React.FormEvent) => Promise<void>
  handleDeleteGallery: (id: string) => Promise<void>
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>, type: string) => Promise<void>
}

export function GalleryTab({
  gallery,
  galleryForm,
  loading,
  uploadingImage,
  setGalleryForm,
  handleCreateGallery,
  handleDeleteGallery,
  handleFileUpload,
}: GalleryTabProps) {
  return (
    <div className="space-y-6">
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
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Image *</label>
            <div className="flex gap-4 items-start">
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, "gallery")}
                disabled={uploadingImage}
                className="flex-1"
                required={!galleryForm.image_url}
              />
              {uploadingImage && <Loader2 className="animate-spin h-5 w-5" />}
            </div>
            {galleryForm.image_url && (
              <div className="mt-2 relative w-32 h-32">
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

          <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary-600">
            {loading ? <Loader2 className="animate-spin mr-2" /> : <Plus className="mr-2" />}
            Upload Item
          </Button>
        </form>
      </Card>

      {/* Gallery Grid */}
      <Card className="p-6">
        <h3 className="text-xl font-bold mb-4">Gallery Items ({gallery.length})</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {gallery.length === 0 ? (
            <p className="text-center text-neutral-500 py-8 col-span-full">
              No gallery items yet. Upload your first image!
            </p>
          ) : (
            gallery.map((item: any) => (
              <Card key={item.id} className="overflow-hidden">
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h4 className="font-bold">{item.title}</h4>
                  <p className="text-sm text-neutral-600 line-clamp-2">{item.description}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs rounded-full capitalize">
                      {item.category}
                    </span>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteGallery(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
