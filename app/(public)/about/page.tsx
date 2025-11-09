"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Target, Heart, Eye, Mail, Phone, Linkedin, Award, BookOpen, Globe } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: "Mission",
      description:
        "To develop the personality of Indian youth through holistic programs combining education, skill development, and character building.",
    },
    {
      icon: Eye,
      title: "Vision",
      description:
        "A prosperous India with empowered, skilled, and socially conscious youth leading development across all sectors.",
    },
    {
      icon: Heart,
      title: "Values",
      description: "Integrity, inclusivity, excellence, and commitment to youth empowerment and national development.",
    },
    {
      icon: Users,
      title: "Commitment",
      description:
        "Equal opportunities for all youth irrespective of background, ensuring accessibility across urban and rural areas.",
    },
  ]

  const teamMembers = [
    {
      id: 1,
      name: "Dr. Rajesh Kumar",
      position: "Director - Skill Development",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
      bio: "Expert in youth skill development with 15+ years of experience in designing and implementing training programs.",
      email: "rajesh.kumar@youthaffairs.gov.in",
      phone: "+91 11 2345 6789",
    },
    {
      id: 2,
      name: "Ms. Priya Sharma",
      position: "Head - Leadership Programs",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
      bio: "Specializes in leadership training and has mentored over 10,000 young leaders across India.",
      email: "priya.sharma@youthaffairs.gov.in",
      phone: "+91 11 2345 6790",
    },
    {
      id: 3,
      name: "Mr. Amit Patel",
      position: "Director - Entrepreneurship Cell",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
      bio: "Former entrepreneur and startup mentor, helping young minds turn ideas into successful ventures.",
      email: "amit.patel@youthaffairs.gov.in",
      phone: "+91 11 2345 6791",
    },
    {
      id: 4,
      name: "Dr. Sunita Reddy",
      position: "Head - Research & Development",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=400&fit=crop",
      bio: "PhD in Youth Psychology, leading research initiatives to improve program effectiveness and impact.",
      email: "sunita.reddy@youthaffairs.gov.in",
      phone: "+91 11 2345 6792",
    },
    {
      id: 5,
      name: "Mr. Vikram Singh",
      position: "Director - State Coordination",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      bio: "Manages partnerships with state governments and ensures seamless program implementation nationwide.",
      email: "vikram.singh@youthaffairs.gov.in",
      phone: "+91 11 2345 6793",
    },
    {
      id: 6,
      name: "Ms. Kavita Desai",
      position: "Head - Digital Initiatives",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
      bio: "Leading digital transformation efforts and online learning platforms for youth across India.",
      email: "kavita.desai@youthaffairs.gov.in",
      phone: "+91 11 2345 6794",
    },
  ]

  return (
    <main className="min-h-screen">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-center text-foreground mb-6">
              About the <span className="text-primary">Institute</span>
            </h1>
            <p className="text-xl text-center text-muted-foreground max-w-3xl mx-auto text-balance">
              Established as a premier national organization dedicated to youth development, the Institute of Youth
              Affairs works towards building a capable and confident generation of leaders.
            </p>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Core Values</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value, index) => {
                const IconComponent = value.icon
                return (
                  <Card key={index}>
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                        <IconComponent size={24} />
                      </div>
                      <CardTitle>{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-foreground/70">{value.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* History Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-4xl font-bold text-center text-foreground">Our Journey</h2>
            <div className="space-y-4 text-foreground/80">
              <p>
                The Institute of Youth Affairs has been instrumental in shaping the careers and personalities of
                millions of young Indians. Founded with a vision to empower youth, it has grown into a national
                institution with presence across all states.
              </p>
              <p>
                Through various programs spanning skill development, leadership training, entrepreneurship support, and
                social responsibility, the Institute has created pathways for youth to realize their potential and
                contribute meaningfully to national development.
              </p>
              <p>
                Today, as India marches towards becoming a developed nation, the Institute remains committed to ensuring
                that every young person, regardless of their background, has access to quality education and skill
                development opportunities.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section - Compact */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground">Our Team</h2>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {/* General Secretary - Left Side */}
              <div className="md:col-span-1">
                <Card className="overflow-hidden border-2 border-primary/20 h-full">
                  <div className="relative h-72 bg-gradient-to-br from-primary/10 to-primary/5">
                    <Image
                      src="/team/mohuya.jpg"
                      alt="Mohuya Saha"
                      fill
                      className="object-cover object-[center_top]"
                      style={{ objectPosition: 'center 0%' }}
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="text-center mb-3">
                      <h3 className="text-lg font-bold text-foreground mb-1">Mohuya Saha</h3>
                      <p className="text-sm text-primary font-semibold mb-2">General Secretary</p>
                    </div>
                    <p className="text-xs text-foreground/70 leading-relaxed mb-3">
                      Leading the Institute with over 20 years of experience in youth development. 
                      Instrumental in launching nationwide programs benefiting millions of young Indians.
                    </p>
                    <div className="flex justify-center gap-3 text-xs">
                      <a href="mailto:secretary@youthaffairs.gov.in" className="text-muted-foreground hover:text-primary">
                        <Mail size={14} />
                      </a>
                      <a href="tel:+911123456789" className="text-muted-foreground hover:text-primary">
                        <Phone size={14} />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Team Members - Right Side */}
              <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-4">
                {teamMembers.map((member) => (
                  <div key={member.id} className="group relative overflow-hidden rounded-lg aspect-square cursor-pointer">
                    {/* Image */}
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover object-top transition-transform duration-300 group-hover:scale-110"
                    />
                    
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <h3 className="text-white font-bold text-sm mb-1">{member.name}</h3>
                      <p className="text-white/90 text-xs font-medium">{member.position}</p>
                      <div className="flex gap-2 mt-2">
                        <a 
                          href={`mailto:${member.email}`} 
                          className="text-white/80 hover:text-white transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Mail size={12} />
                        </a>
                        <a 
                          href={`tel:${member.phone.replace(/\s/g, '')}`}
                          className="text-white/80 hover:text-white transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Phone size={12} />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
  )
}
