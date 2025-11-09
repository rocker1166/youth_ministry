export default function MinistryGrid() {
  const ministries = [
    {
      title: "Skill Development",
      description: "Industry-relevant training programs for youth",
      icon: "🎓",
    },
    {
      title: "Entrepreneurship",
      description: "Support for young entrepreneurs and startups",
      icon: "🚀",
    },
    {
      title: "Sports & Fitness",
      description: "Athletic training and wellness initiatives",
      icon: "⚽",
    },
    {
      title: "Digital Literacy",
      description: "Technology and coding workshops",
      icon: "💻",
    },
    {
      title: "Social Service",
      description: "Community engagement and volunteering",
      icon: "🤝",
    },
    {
      title: "Leadership",
      description: "Leadership development programs",
      icon: "👨‍💼",
    },
  ]

  return (
    <section className="py-16 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-neutral-900">Our Initiatives</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ministries.map((ministry, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-gov-primary"
            >
              <div className="text-4xl mb-3">{ministry.icon}</div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">{ministry.title}</h3>
              <p className="text-neutral-600">{ministry.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
