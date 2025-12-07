"use client"

import type React from "react"
import { useState, KeyboardEvent } from "react"
import { Card } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Textarea } from "@/app/components/ui/textarea"
import { Badge } from "@/app/components/ui/badge"
import { Loader2, Plus, Trash2, X, Eye } from "lucide-react"
import {
  EditorProvider,
  type Editor,
} from "@/app/components/ui/shadcn-io/editor"

interface NewsTabProps {
  news: any[]
  newsForm: {
    title: string
    content: string
    excerpt: string
    category: string
    featured_image: string
    tags: string[]
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
  const [previewMode, setPreviewMode] = useState(false)
  const [tagInput, setTagInput] = useState("")

  const handleAddTag = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault()
      if (!newsForm.tags.includes(tagInput.trim())) {
        setNewsForm({ ...newsForm, tags: [...newsForm.tags, tagInput.trim()] })
      }
      setTagInput("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setNewsForm({ ...newsForm, tags: newsForm.tags.filter(tag => tag !== tagToRemove) })
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Create News Article</h2>
          <Button
            type="button"
            variant="outline"
            onClick={() => setPreviewMode(!previewMode)}
          >
            <Eye className="mr-2 h-4 w-4" />
            {previewMode ? "Edit Mode" : "Preview Mode"}
          </Button>
        </div>

        {previewMode ? (
          <div className="space-y-4 border rounded-lg p-6 bg-gray-50">
            <div>
              <h3 className="text-3xl font-bold mb-2">{newsForm.title || "Untitled Article"}</h3>
              <p className="text-sm text-gray-600 mb-4">
                Category: <span className="font-semibold capitalize">{newsForm.category || "N/A"}</span>
              </p>
              {newsForm.featured_image && (
                <img
                  src={newsForm.featured_image}
                  alt="Featured"
                  className="w-full max-w-2xl h-64 object-cover rounded-lg mb-4"
                />
              )}
              {newsForm.excerpt && (
                <p className="text-lg text-gray-700 italic mb-4">{newsForm.excerpt}</p>
              )}
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: newsForm.content || "*No content yet*" }} />
            </div>
          </div>
        ) : (
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
            <EditorProvider
              className="border rounded-md min-h-[400px] bg-white"
              placeholder="Write your article content here... Use / for commands"
              content={newsForm.content}
              immediatelyRender={false}
              onUpdate={({ editor }: { editor: Editor }) => {
                const html = editor.getHTML()
                setNewsForm({ ...newsForm, content: html })
              }}
            />
            <p className="text-xs text-gray-500 mt-1">
              Rich text editor with formatting options. Use the toolbar to format your content.
            </p>
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
              <option value="program launch">Program Launch</option>
              <option value="partnership">Partnership</option>
              <option value="success story">Success Story</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Tags</label>
            <div className="space-y-2">
              {/* Display existing tags as chips */}
              {newsForm.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {newsForm.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-sm px-3 py-1">
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-2 text-gray-500 hover:text-gray-700"
                        aria-label={`Remove ${tag} tag`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
              {/* Tag input */}
              <Input
                placeholder="Type a tag and press Enter"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
              />
              <p className="text-xs text-gray-500">
                Press Enter to add a tag
              </p>
            </div>
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
        )}
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
