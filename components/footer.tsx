"use client"

import Image from "next/image"
import Link from "next/link"
import { Phone, Mail, MapPin, Twitter, Facebook, Linkedin, Instagram, ArrowRight, Youtube, ExternalLink, Github } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

const footerSections = [
  {
    title: "IYA",
    links: [
      { label: "About us", href: "/about" },
      { label: "FAQs", href: "/faqs" },
      { label: "Leadership", href: "/leadership" },
      { label: "Workshop Feedback", href: "/feedback" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "PROGRAMS",
    links: [
      { label: "Overview", href: "/programs" },
      { label: "Skills Training", href: "/programs/skills" },
      { label: "Leadership Development", href: "/programs/leadership" },
      { label: "Entrepreneurship", href: "/programs/entrepreneurship" },
    ],
  },
  {
    title: "ARCHIVE",
    links: [
      { label: "Overview", href: "/archive" },
      { label: "Guidelines", href: "/guidelines" },
    ],
  },
  {
    title: "EVENTS",
    links: [
      { label: "Upcoming Events", href: "/events" },
      { label: "Skill Development", href: "/events?category=skill" },
      { label: "Workshops", href: "/events?category=workshop" },
      { label: "Related Links", href: "/events/links" },
    ],
  },
  {
    title: "TOOLS",
    links: [
      { label: "Apply Now", href: "/apply", icon: true },
      { label: "Student Portal", href: "/portal", icon: true },
      { label: "Accessibility", href: "/accessibility" },
      { label: "Resources Library", href: "/library" },
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
    { icon: Linkedin, url: settings.social_linkedin || "#", label: "LinkedIn" },
    { icon: Facebook, url: settings.social_facebook || "#", label: "Facebook" },
    { icon: Twitter, url: settings.social_twitter || "#", label: "Twitter" },
    { icon: Youtube, url: settings.social_youtube || "#", label: "YouTube" },
    { icon: Github, url: settings.social_github || "#", label: "Github" },
    { icon: Instagram, url: settings.social_instagram || "#", label: "Instagram" },
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
              <Link href="/contact" className="flex items-center gap-2">
                Get in touch <ArrowRight size={18} />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
                <p className="text-sm text-white/60">An institute for youth empowerment in science and other sections</p>
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

            {/* Visitor Count & Last Updated */}
            <div className="space-y-1 text-sm">
              <p className="text-white/50">Last updated: {lastUpdated || "9/11/2025"}</p>
              <p className="text-white/70">
                <span className="font-semibold">Visitor:</span> {visitorCount}
              </p>
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
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms & Conditions
              </Link>
              <span>|</span>
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
