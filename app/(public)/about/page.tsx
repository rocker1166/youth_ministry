"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Target, Heart, Eye, Mail, Phone, Linkedin, Award, BookOpen, Globe } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: "National Integration",
      description:
        "To promote national integration, unity, and peace through youth exchange and collaborative activities. Drawing inspiration from India's tricolor, we unite youth from diverse cultures, languages, and regions.",
    },
    {
      icon: Eye,
      title: "Youth Empowerment",
      description:
        "To empower youth in different subjects for making worthy human beings and develop leadership and responsibility. We provide training and skill development to enhance employability and entrepreneurship for Golden India.",
    },
    {
      icon: Heart,
      title: "Cultural Heritage",
      description: "To arouse consciousness about the Cultural Heritage of our Country and promote youth affairs related Scientific and Cultural projects. Celebrating India's diversity and sustainability through multi-cultural programs.",
    },
    {
      icon: Users,
      title: "Scientific Education",
      description:
        "To foster the spirit of Literacy, Scientific and Technical Education. Supporting Science research and innovation in youth-related issues through national seminars, training programs, and expert guidance.",
    },
  ]

  // Governing Body Members
  const governingBodyMembers = [
    {
      name: "Shri Kajal Kumar Sur",
      designation: "Vice-President",
    },
    {
      name: "Smt. Mou Pramanik",
      designation: "Treasurer",
    },
    {
      name: "Shri Soumen Konar",
      designation: "Asst. General Secretary",
    },
    {
      name: "Shri Alok Kumar Ghosh",
      designation: "Member Executive",
    },
    {
      name: "Shri Anupam Chattopadhyay",
      designation: "Member Executive",
    },
    {
      name: "Ms Moumita Sen",
      designation: "Member Executive",
    },
    {
      name: "Shri Chandan Ghosh",
      designation: "Member Executive",
    },
    {
      name: "Shri Rajib De",
      designation: "Member Executive",
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
                Since 2014, the Institute of Youth Affairs has celebrated its journey by organizing the National Integration Camp, National Seminars, National Science Awareness Campaign, and workshops to encourage young minds in Science. We exchange mutually our cultural ties between students & youth from different corners of India, creating an eternal bond with the aim of implementing people-centered and community-oriented development programs with permanent impact on their lives.
              </p>
              <p>
                Drawing inspiration from the vibrant colours of India's national flag — saffron, white and green, and the blue chakra that reflects growth amid challenges — we have successfully organized 11 National Integration Camps across states including Karnataka, Rajasthan, Goa, Meghalaya, Gujarat, Assam, Tamil Nadu, Tripura, Andaman & Nicobar Island, Arunachal Pradesh, and Sikkim.
              </p>
              <p>
                Throughout each camp, we offer efficient training on subjects like Yoga, Aerobics, Drill, Self-Defence, Career Guidance, Technical Education, Music & Dance by experts, high dignitaries, vice-chancellors, and professors. Participants, aged 14 to 22, stay together for 8 days, developing discipline, understanding the value of time, mutual cooperation, and friendliness. They discover multi-cultural, multi-lingual, multi-racial unity that helps them develop a sense of integrity and national integration.
              </p>
            </div>
          </div>
        </section>

        {/* Governing Body Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-foreground mb-3">Governing Body</h2>
              <p className="text-muted-foreground">Leadership guiding our mission to empower youth</p>
            </div>

            {/* President & General Secretary - Top Row with Photos */}
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-10">
              {/* President */}
              <Card className="overflow-hidden border-2 border-primary/30 shadow-lg hover:shadow-xl transition-shadow">
                <div className="relative h-72 bg-gradient-to-br from-primary/10 to-primary/5">
                  <Image
                    src="/team/Basab.jpg"
                    alt="Professor (Dr.) Basab Chaudhuri"
                    fill
                    className="object-cover object-[center_20%]"
                    style={{ objectPosition: 'center 20%' }}
                  />
                </div>
                <CardContent className="p-5">
                  <div className="text-center">
                    <Badge className="mb-2 bg-primary text-white px-3 py-1 text-xs">President</Badge>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      Professor (Dr.) Basab Chaudhuri
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Leading the organization with distinguished academic excellence
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* General Secretary */}
              <Card className="overflow-hidden border-2 border-primary/30 shadow-lg hover:shadow-xl transition-shadow">
                <div className="relative h-72 bg-gradient-to-br from-primary/10 to-primary/5">
                  <Image
                    src="/team/mohuya.jpg"
                    alt="Smt. Mohuya Saha"
                    fill
                    className="object-cover object-[center_top]"
                    style={{ objectPosition: 'center 0%' }}
                  />
                </div>
                <CardContent className="p-5">
                  <div className="text-center">
                    <Badge className="mb-2 bg-primary text-white px-3 py-1 text-xs">General Secretary</Badge>
                    <h3 className="text-lg font-bold text-foreground mb-2">Smt. Mohuya Saha</h3>
                    <p className="text-xs text-muted-foreground">
                      Dedicated to youth development with extensive experience
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Executive Members - Full Width Below */}
            <Card className="shadow-lg">
              <CardHeader className="border-b bg-gradient-to-r from-primary/5 to-primary/10 py-4">
                <CardTitle className="text-xl text-center">Executive Members</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {governingBodyMembers.map((member, index) => (
                    <div
                      key={index}
                      className="group relative p-4 rounded-lg border-2 border-slate-200 dark:border-slate-700 hover:border-primary transition-all bg-white dark:bg-slate-800 hover:shadow-lg"
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-base mb-2 group-hover:bg-primary group-hover:text-white transition-colors">
                          {index + 1}
                        </div>
                        <h4 className="font-semibold text-foreground text-sm mb-1.5 leading-snug">{member.name}</h4>
                        <p className="text-xs text-muted-foreground font-medium">{member.designation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
  )
}
