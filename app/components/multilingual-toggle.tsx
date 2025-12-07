"use client"

import { useState, useEffect } from "react"
import { Button } from "@/app/components/ui/button"

export function MultilingualToggle() {
  const [language, setLanguage] = useState("en")

  useEffect(() => {
    // Get language from localStorage or browser default
    const saved = localStorage.getItem("language") || "en"
    setLanguage(saved)
    document.documentElement.lang = saved
  }, [])

  const toggleLanguage = (lang: string) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
    document.documentElement.lang = lang
    // Trigger page refresh or re-render as needed
    window.location.reload()
  }

  return (
    <div className="flex gap-2">
      <Button
        variant={language === "en" ? "default" : "outline"}
        onClick={() => toggleLanguage("en")}
        className={language === "en" ? "bg-primary" : ""}
      >
        EN
      </Button>
      <Button
        variant={language === "hi" ? "default" : "outline"}
        onClick={() => toggleLanguage("hi")}
        className={language === "hi" ? "bg-primary" : ""}
      >
        हिंदी
      </Button>
    </div>
  )
}
