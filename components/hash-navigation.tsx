"use client"

import { useEffect } from "react"

export default function HashNavigation() {
  // Handle hash navigation when page loads
  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      // Wait for page to fully render, then scroll to section
      setTimeout(() => {
        const element = document.getElementById(hash.substring(1))
        if (element) {
          // Account for fixed navbar
          const navbarHeight = 80
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
          const offsetPosition = elementPosition - navbarHeight

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        }
      }, 100)
    }
  }, [])

  return null
}






