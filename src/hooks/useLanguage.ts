import {useEffect } from 'react'
import type { AppLanguage } from '../types'

export function useLanguage() {
  

  
  useEffect(() => {
    localStorage.removeItem('Moodistic_language')
  }, [])

  return { 
    language: 'en' as AppLanguage, 
    setLanguage: () => {} 
  }
}