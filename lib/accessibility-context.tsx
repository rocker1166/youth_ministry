"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

type FontSize = "normal" | "large" | "larger"
type Language = "en" | "hi"

interface AccessibilityContextType {
  fontSize: FontSize
  increaseFontSize: () => void
  decreaseFontSize: () => void
  language: Language
  toggleLanguage: () => void
  t: (key: string) => string
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined)

// Translation dictionary
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    home: "Home",
    about: "About",
    programs: "Programs",
    events: "Events",
    news: "News",
    resources: "Resources",
    
    // Common
    "read_more": "Read More",
    "learn_more": "Learn More",
    "view_all": "View All",
    "register_now": "Register Now",
    "apply_now": "Apply Now",
    "contact_us": "Contact Us",
    
    // Home page
    "hero_title": "Empowering India's Youth",
    "hero_subtitle": "Building tomorrow's leaders through education, skills, and opportunities",
    "explore_programs": "Explore Programs",
    "upcoming_events": "Upcoming Events",
    "latest_news": "Latest News",
    
    // About page
    "about_title": "About the Institute",
    "governing_body": "Governing Body",
    "our_mission": "Our Mission",
    "our_vision": "Our Vision",
    
    // Programs
    "skill_development": "Skill Development",
    "leadership_training": "Leadership Training",
    "entrepreneurship": "Entrepreneurship",
    
    // Footer
    "quick_links": "Quick Links",
    "contact_info": "Contact Information",
    "follow_us": "Follow Us",
  },
  hi: {
    // Navigation
    home: "होम",
    about: "हमारे बारे में",
    programs: "कार्यक्रम",
    events: "आयोजन",
    news: "समाचार",
    resources: "संसाधन",
    
    // Common
    "read_more": "और पढ़ें",
    "learn_more": "अधिक जानें",
    "view_all": "सभी देखें",
    "register_now": "अभी पंजीकरण करें",
    "apply_now": "अभी आवेदन करें",
    "contact_us": "संपर्क करें",
    
    // Home page
    "hero_title": "भारत के युवाओं को सशक्त बनाना",
    "hero_subtitle": "शिक्षा, कौशल और अवसरों के माध्यम से कल के नेताओं का निर्माण",
    "explore_programs": "कार्यक्रम देखें",
    "upcoming_events": "आगामी आयोजन",
    "latest_news": "ताजा समाचार",
    
    // About page
    "about_title": "संस्थान के बारे में",
    "governing_body": "प्रशासनिक निकाय",
    "our_mission": "हमारा मिशन",
    "our_vision": "हमारी दृष्टि",
    
    // Programs
    "skill_development": "कौशल विकास",
    "leadership_training": "नेतृत्व प्रशिक्षण",
    "entrepreneurship": "उद्यमिता",
    
    // Footer
    "quick_links": "त्वरित लिंक",
    "contact_info": "संपर्क जानकारी",
    "follow_us": "हमें फॉलो करें",
  },
}

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [fontSize, setFontSize] = useState<FontSize>("normal")
  const [language, setLanguage] = useState<Language>("en")

  // Load saved preferences
  useEffect(() => {
    const savedFontSize = localStorage.getItem("fontSize") as FontSize
    const savedLanguage = localStorage.getItem("language") as Language
    
    if (savedFontSize) setFontSize(savedFontSize)
    if (savedLanguage) setLanguage(savedLanguage)
  }, [])

  // Apply font size to document
  useEffect(() => {
    const root = document.documentElement
    
    switch (fontSize) {
      case "large":
        root.style.fontSize = "112.5%" // 18px
        break
      case "larger":
        root.style.fontSize = "125%" // 20px
        break
      default:
        root.style.fontSize = "100%" // 16px
    }
    
    localStorage.setItem("fontSize", fontSize)
  }, [fontSize])

  // Save language preference
  useEffect(() => {
    localStorage.setItem("language", language)
    document.documentElement.lang = language
  }, [language])

  const increaseFontSize = () => {
    setFontSize((prev) => {
      if (prev === "normal") return "large"
      if (prev === "large") return "larger"
      return "larger"
    })
  }

  const decreaseFontSize = () => {
    setFontSize((prev) => {
      if (prev === "larger") return "large"
      if (prev === "large") return "normal"
      return "normal"
    })
  }

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "hi" : "en"))
  }

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return (
    <AccessibilityContext.Provider
      value={{
        fontSize,
        increaseFontSize,
        decreaseFontSize,
        language,
        toggleLanguage,
        t,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  )
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext)
  if (!context) {
    throw new Error("useAccessibility must be used within AccessibilityProvider")
  }
  return context
}
