import { GraduationCap, Rocket, Users, Laptop, Heart, UserCheck } from "lucide-react"

export default function MinistryGrid() {
  const ministries = [
    {
      title: "Skill Development",
      description: "Industry-relevant training programs for youth empowerment",
      icon: GraduationCap,
      color: "bg-blue-50 text-blue-600 border-blue-200",
    },
    {
      title: "Entrepreneurship",
      description: "Support for young entrepreneurs and startups",
      icon: Rocket,
      color: "bg-purple-50 text-purple-600 border-purple-200",
    },
    {
      title: "Leadership Development",
      description: "Building future leaders through mentorship programs",
      icon: UserCheck,
      color: "bg-green-50 text-green-600 border-green-200",
    },
    {
      title: "Digital Literacy",
      description: "Technology and coding workshops for digital age",
      icon: Laptop,
      color: "bg-cyan-50 text-cyan-600 border-cyan-200",
    },
    {
      title: "Social Service",
      description: "Community engagement and volunteering initiatives",
      icon: Heart,
      color: "bg-pink-50 text-pink-600 border-pink-200",
    },
    {
      title: "Career Guidance",
      description: "Professional counseling and placement assistance",
      icon: Users,
      color: "bg-orange-50 text-orange-600 border-orange-200",
    },
  ]

  return (
    <section className="py-16 bg-gray-50 border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our <span className="text-primary">Initiatives</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive programs designed to empower youth across multiple domains
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ministries.map((ministry, idx) => {
            const IconComponent = ministry.icon
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-primary group cursor-pointer"
              >
                <div className={`w-14 h-14 rounded-lg ${ministry.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <IconComponent size={28} strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                  {ministry.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{ministry.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
