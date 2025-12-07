"use client"

import { useState, useRef, useEffect } from "react"
import { Input } from "@/app/components/ui/input"
import { Card } from "@/app/components/ui/card"
import { Search, Loader2 } from "lucide-react"

interface SearchResult {
  events: any[]
  news: any[]
  programs: any[]
  faqs: any[]
  total: number
}

export function GlobalSearch() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSearch = async (value: string) => {
    setQuery(value)

    if (value.length < 2) {
      setResults(null)
      return
    }

    setLoading(true)
    try {
      const lang = localStorage.getItem("language") || "en"
      const response = await fetch(`/api/search?q=${encodeURIComponent(value)}&lang=${lang}`)
      const data = await response.json()
      setResults(data)
      setShowResults(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div ref={searchRef} className="relative w-full md:w-64">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search..." value={query} onChange={(e) => handleSearch(e.target.value)} className="pl-10" />
        {loading && <Loader2 className="absolute right-3 top-3 h-4 w-4 animate-spin" />}
      </div>

      {showResults && results && results.total > 0 && (
        <Card className="absolute top-full left-0 right-0 mt-2 p-4 z-50 max-h-96 overflow-y-auto">
          {results.events.length > 0 && (
            <div className="mb-4">
              <h4 className="font-semibold text-sm text-primary mb-2">Events</h4>
              {results.events.map((event) => (
                <a
                  key={event.id}
                  href={`/events/${event.id}`}
                  className="block p-2 hover:bg-neutral-100 rounded text-sm"
                >
                  {event.title}
                </a>
              ))}
            </div>
          )}

          {results.news.length > 0 && (
            <div className="mb-4">
              <h4 className="font-semibold text-sm text-primary mb-2">News</h4>
              {results.news.map((article) => (
                <a
                  key={article.id}
                  href={`/news/${article.slug}`}
                  className="block p-2 hover:bg-neutral-100 rounded text-sm"
                >
                  {article.title}
                </a>
              ))}
            </div>
          )}

          {results.programs.length > 0 && (
            <div className="mb-4">
              <h4 className="font-semibold text-sm text-primary mb-2">Programs</h4>
              {results.programs.map((program) => (
                <a
                  key={program.id}
                  href={`/programs/${program.id}`}
                  className="block p-2 hover:bg-neutral-100 rounded text-sm"
                >
                  {program.title}
                </a>
              ))}
            </div>
          )}
        </Card>
      )}
    </div>
  )
}
