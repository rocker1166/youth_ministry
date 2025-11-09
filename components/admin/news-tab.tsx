"use client"

import type React from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Plus, Trash2, X } from "lucide-react"

interface NewsTabProps {
  news: any[]
  newsForm: {
    title: string
    content: string
    excerpt: string
    category: string
    featured_image: string
  }
  loading: boolean
  uploadingImage: boolean
  setNewsForm: (form: any) => void
  handleCreateNews: (e: React.FormEvent) => Promise<void>
  handleDeleteNews: (id: string) => Promise<void>
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>, type: string) => Promise<void>
}

export function NewsTab({
  news,
  newsForm,
  loading,
  uploadingImage,
  setNewsForm,
  handleCreateNews,
  handleDeleteNews,
  handleFileUpload,
}: NewsTabProps) {
  return (
    <div className="space-y-6">
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
    </div>
  )
}
