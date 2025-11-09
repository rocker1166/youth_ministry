"use client"

import { useState, useEffect } from "react"

interface TypingTextProps {
  texts: string[]
  typingSpeed?: number
  deletingSpeed?: number
  pauseDuration?: number
  className?: string
}

export function TypingText({ 
  texts, 
  typingSpeed = 80, 
  deletingSpeed = 40, 
  pauseDuration = 2000,
  className = ""
}: TypingTextProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false)
        setIsDeleting(true)
      }, pauseDuration)
      return () => clearTimeout(pauseTimer)
    }

    const targetText = texts[currentTextIndex]
    
    if (!isDeleting && currentText === targetText) {
      setIsPaused(true)
      return
    }

    if (isDeleting && currentText === "") {
      setIsDeleting(false)
      setCurrentTextIndex((prev) => (prev + 1) % texts.length)
      return
    }

    const timer = setTimeout(() => {
      setCurrentText((prev) => {
        if (isDeleting) {
          return prev.slice(0, -1)
        } else {
          return targetText.slice(0, prev.length + 1)
        }
      })
    }, isDeleting ? deletingSpeed : typingSpeed)

    return () => clearTimeout(timer)
  }, [currentText, currentTextIndex, isDeleting, isPaused, texts, typingSpeed, deletingSpeed, pauseDuration])

  return (
    <span className={`inline-block min-w-[280px] ${className}`}>
      {currentText}
      <span className="animate-blink inline-block w-0.5 h-[0.8em] bg-current ml-1 align-middle" />
    </span>
  )
}
