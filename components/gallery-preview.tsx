import Link from "next/link"
import { ArrowRight, Image as ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function GalleryPreview() {
  const gallery = [
    { 
      id: 1, 
      title: "Leadership Summit", 
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop",
      category: "Events"
    },
    { 
      id: 2, 
      title: "Training Workshop", 
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop",
      category: "Training"
    },
    { 
      id: 3, 
      title: "Community Event", 
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&h=400&fit=crop",
      category: "Community"
    },
    { 
      id: 4, 
      title: "Sports Tournament", 
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&h=400&fit=crop",
      category: "Sports"
    },
    { 
      id: 5, 
      title: "Tech Workshop", 
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop",
      category: "Technology"
    },
    { 
      id: 6, 
      title: "Cultural Program", 
      image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&h=400&fit=crop",
      category: "Culture"
    },
  ]

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
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {gallery.map((item) => (
            <div 
              key={item.id} 
              className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer aspect-[4/3]"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-4 w-full">
                  <span className="inline-block px-2 py-1 text-xs font-semibold bg-primary text-white rounded mb-2">
                    {item.category}
                  </span>
                  <p className="text-white font-semibold text-sm">{item.title}</p>
                </div>
              </div>
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <ImageIcon className="w-4 h-4 text-primary" />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/gallery">
            <Button variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-white group">
              View Full Gallery
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
