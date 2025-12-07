"use client"

import Image from "next/image"
import Link from "next/link"
import { Phone, Mail, MapPin, Twitter, Facebook, Linkedin, Instagram, ArrowRight, Youtube, ExternalLink, Github } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "@/app/components/ui/button"

const footerSections = [
  {
    title: "IYA",
    links: [
      { label: "About Us", href: "/about" },
      { label: "News", href: "/news" },
      { label: "Grievance", href: "/grievance" },
    ],
  },
  {
    title: "PROGRAMS",
    links: [
      { label: "Overview", href: "/programs" },
    ],
  },
  {
    title: "ARCHIVE",
    links: [
      { label: "Overview", href: "/archive" },
    ],
  },
  {
    title: "CAMPS",
    links: [
      { label: "Youth Camps", href: "/camp" },
    ],
  },
 
]

interface SiteSettings {
  [key: string]: string
}

export function Footer() {
  const [settings, setSettings] = useState<SiteSettings>({})
  const [lastUpdated, setLastUpdated] = useState("")
  const [visitorCount, setVisitorCount] = useState("261771")

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch("/api/settings")
        if (response.ok) {
          const data = await response.json()
          setSettings(data)
          const updated = new Date(data.last_updated || Date.now())
          setLastUpdated(
            updated.toLocaleDateString("en-IN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
          )
        }
      } catch (error) {
        console.error("Failed to fetch settings:", error)
      }
    }
    fetchSettings()
  }, [])

  const socialLinks = [
    { icon: Linkedin || "#", label: "LinkedIn" },
    { icon: Facebook || "#", label: "Facebook" },
    { icon: Twitter || "#", label: "Twitter" },
    { icon: Youtube || "#", label: "YouTube" },
    { icon: Github || "#", label: "Github" },
    { icon: Instagram || "#", label: "Instagram" },
  ]

  return (
    <footer className="bg-slate-900 text-white">
      {/* Need Support CTA Section */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Need Support?</h2>
              <p className="text-white/70 text-lg">Reach out to us and we will get back to you</p>
            </div>
            <Button
              asChild
              size="lg"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-slate-900 transition-all duration-300 rounded-full px-8"
            >
              <a href="mailto:youthaffairs14@gmail.com?subject=Support Request&body=Hello, I need support regarding..." className="flex items-center gap-2">
                Get in touch <ArrowRight size={18} />
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Contact Information Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 pb-8 border-b border-white/10">
          <div className="flex items-start gap-4">
            <MapPin className="w-5 h-5 text-blue-400 shrink-0 mt-1" />
            <div>
              <p className="font-semibold text-white mb-2">Address</p>
              <p className="text-sm text-white/70">11/1, S.N. Banerjee Road, Barrackpore, Kolkata – 700 120</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Phone className="w-5 h-5 text-blue-400 shrink-0 mt-1" />
            <div>
              <p className="font-semibold text-white mb-2">Phone</p>
              <p className="text-sm text-white/70">+91-74398 41005</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Mail className="w-5 h-5 text-blue-400 shrink-0 mt-1" />
            <div>
              <p className="font-semibold text-white mb-2">Email</p>
              <p className="text-sm text-white/70">youthaffairs14@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Section */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
               <Image 
               src = "/logo/Logo.jpg"
               alt = "IYA Logo"
               width = {48}
               height = {48}
               className = "rounded-lg"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1">Institute of Youth Affairs</h3>
                <p className="text-sm text-white/60">An institute for youth empowerment in science and other sectors</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border-2 border-white/30 hover:border-white hover:bg-white/10 flex items-center justify-center transition-all duration-300"
                  title={link.label}
                >
                  <link.icon size={18} />
                </a>
              ))}
            </div>

           
          </div>

          {/* Footer Links Sections */}
          {footerSections.map((section, index) => (
            <div key={index} className="space-y-4">
              <h4 className="font-bold text-white text-sm tracking-wider">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 hover:text-white transition-colors flex items-center gap-1"
                    >
                      {link.label}
                      {link.icon && <ExternalLink size={12} className="opacity-50" />}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <div className="flex flex-col md:flex-row items-center gap-2 text-white/60">
              <p>© 2025 - Copyright Institute of Youth Affairs. All rights reserved.</p>
              <span className="hidden md:inline">|</span>
              <p>Powered by Ministry of Youth Affairs & Sports</p>
            </div>
            <div className="flex gap-4 text-white/60">
              <span>Empowering Youth for Nation Building</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
