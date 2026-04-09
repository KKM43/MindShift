import { useState, useEffect } from 'react'
import type { AppLanguage } from '../types'

export function useLanguage() {

  const [language, setLanguage] = useState<AppLanguage>(() => {
    const saved = localStorage.getItem('Moodistic_language')
    return (saved as AppLanguage) || 'en'
  })

  useEffect(() => {
    localStorage.setItem('Moodistic_language', language)
  }, [language])

  return { language, setLanguage }
}