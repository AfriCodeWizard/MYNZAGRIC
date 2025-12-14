"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export default function HashNavigation() {
  const pathname = usePathname()
  
  // Handle hash navigation when page loads or pathname changes
  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      // Wait for page to fully render, then scroll to section
      // Increase delay if navigating from another page
      const delay = pathname === '/' ? 100 : 300
      
      setTimeout(() => {
        const hashValue = hash.substring(1) // Remove the #
        const element = document.getElementById(hashValue)
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
      }, delay)
    }
  }, [pathname])

  return null
}








