import Link from "next/link"

export default function NewsPreview() {
  const news = [
    {
      id: 1,
      title: "New Scholarship Program Launched",
      excerpt: "Government announces ₹1000 crore scholarship initiative for underprivileged youth.",
      date: "2025-11-09",
      image: "/scholarship-announcement-government.jpg",
    },
    {
      id: 2,
      title: "Youth Employment Rate Reaches 85%",
      excerpt: "Latest statistics show significant improvement in youth employment across India.",
      date: "2025-11-08",
      image: "/employment-statistics-india.jpg",
    },
    {
      id: 3,
      title: "Digital India Initiative Expands",
      excerpt: "New digital literacy centers opening in 500 villages nationwide.",
      date: "2025-11-07",
      image: "/digital-literacy-india.jpg",
    },
  ]

  return (
    <section className="py-16 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-12 text-neutral-900">Latest News</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {news.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-40 object-cover" />
              <div className="p-4">
                <p className="text-sm text-neutral-500 mb-2">{new Date(item.date).toLocaleDateString("en-IN")}</p>
                <h3 className="text-lg font-bold text-neutral-900 mb-2 line-clamp-2">{item.title}</h3>
                <p className="text-neutral-600 text-sm line-clamp-2 mb-4">{item.excerpt}</p>
                <Link href={`/news/${item.id}`} className="text-gov-primary font-semibold text-sm hover:underline">
                  Read More →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
