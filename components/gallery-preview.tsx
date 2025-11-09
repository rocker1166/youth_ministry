export default function GalleryPreview() {
  const gallery = [
    { id: 1, title: "Leadership Summit", image: "/leadership-conference.jpg" },
    { id: 2, title: "Training Workshop", image: "/training-workshop.png" },
    { id: 3, title: "Community Event", image: "/vibrant-community-gathering.png" },
    { id: 4, title: "Sports Tournament", image: "/vibrant-sports-event.png" },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-12 text-neutral-900 text-center">Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {gallery.map((item) => (
            <div key={item.id} className="relative group overflow-hidden rounded-lg">
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <p className="text-white font-semibold opacity-0 group-hover:opacity-100">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
