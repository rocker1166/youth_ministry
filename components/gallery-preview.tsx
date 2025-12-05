"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

// Utility function to shuffle an array using Fisher-Yates algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Generate gallery image paths
function getGalleryImages(): string[] {
  const imageCount = 28 // Total images in the galary folder
  return Array.from({ length: imageCount }, (_, i) => `/galary/${i + 1}.jpeg`)
}

// Category mapping for gallery images
const categories = [
  "Events",
  "Training",
  "Community",
  "Sports",
  "Cultural",
  "Leadership",
  "Workshop",
  "Integration"
]

export default function GalleryPreview() {
  const [gallery, setGallery] = useState<Array<{ id: number; image: string; category: string }>>([])

  // Shuffle gallery images on mount
  useEffect(() => {
    const allImages = getGalleryImages()
    const shuffled = shuffleArray(allImages)
    const selectedImages = shuffled.slice(0, 6).map((image, idx) => ({
      id: idx + 1,
      image,
      category: categories[idx % categories.length]
    }))
    setGallery(selectedImages)
  }, [])

  return (
    <section className="py-16 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Photo <span className="text-primary">Gallery</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Capturing moments of youth empowerment, learning, and growth
          </p>
        </div>
        
        {gallery.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {gallery.map((item) => (
              <div 
                key={item.id} 
                className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer aspect-[4/3]"
              >
                <Image
                  src={item.image}
                  alt={`Camp Gallery ${item.id}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 w-full">
                    <span className="inline-block px-2 py-1 text-xs font-semibold bg-primary text-white rounded mb-2">
                      {item.category}
                    </span>
                    <p className="text-white font-semibold text-sm">National Integration Camp</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
