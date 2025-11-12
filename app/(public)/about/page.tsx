"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
