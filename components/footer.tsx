"use client"

import Link from "next/link"
import { Phone, Mail, MapPin, Twitter, Facebook, Linkedin, Instagram } from "lucide-react"
import { useEffect, useState } from "react"

const footerSections = [
  {
    title: "Organization",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Leadership", href: "/leadership" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
    ],
  },
  {
    title: "Programs",
    links: [
      { label: "Skills Training", href: "/programs/skills" },
      { label: "Leadership", href: "/programs/leadership" },
      { label: "Entrepreneurship", href: "/programs/entrepreneurship" },
      { label: "Scholarships", href: "/programs/scholarships" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "/resources" },
      { label: "Guidelines", href: "/guidelines" },
      { label: "FAQs", href: "/faqs" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Contact", href: "/contact" },
      { label: "Grievance", href: "/grievance" },
    ],
  },
]

interface SiteSettings {
  [key: string]: string
}

export function Footer() {
  const [settings, setSettings] = useState<SiteSettings>({})
  const [lastUpdated, setLastUpdated] = useState("")

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
    { icon: Twitter, url: settings.social_twitter, label: "Twitter" },
    { icon: Facebook, url: settings.social_facebook, label: "Facebook" },
    { icon: Linkedin, url: settings.social_linkedin, label: "LinkedIn" },
    { icon: Instagram, url: settings.social_instagram, label: "Instagram" },
  ]

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                IYA
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold">Institute of</span>
                <span className="text-xs font-semibold">Youth Affairs</span>
              </div>
            </div>
            <p className="text-sm text-white/70 text-balance">
              Empowering India's youth through holistic development and skill enhancement programs.
            </p>
            <div className="space-y-3 text-sm">
              {settings.phone && (
                <div className="flex items-center gap-2 text-white/80">
                  <Phone size={16} />
                  <span>{settings.phone}</span>
                </div>
              )}
              {settings.email && (
                <div className="flex items-center gap-2 text-white/80">
                  <Mail size={16} />
                  <span>{settings.email}</span>
                </div>
              )}
              {settings.address && (
                <div className="flex items-start gap-2 text-white/80">
                  <MapPin size={16} className="mt-0.5" />
                  <span>{settings.address}</span>
                </div>
              )}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index} className="space-y-4">
              <h4 className="font-semibold text-white">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-white/70 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex flex-col sm:flex-row gap-4 text-sm text-white/60">
            <p>© 2025 Institute of Youth Affairs. All rights reserved.</p>
            {lastUpdated && <p className="text-white/50">Last updated: {lastUpdated}</p>}
          </div>
          <div className="flex gap-4">
            {socialLinks.map((link) =>
              link.url ? (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors"
                  title={link.label}
                >
                  <link.icon size={18} />
                </a>
              ) : null,
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
