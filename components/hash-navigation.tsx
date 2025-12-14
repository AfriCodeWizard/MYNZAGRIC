"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export default function HashNavigation() {
  const pathname = usePathname()
  
  // Handle hash navigation when page loads or pathname changes
  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      // Minimal delay for instant navigation - use requestAnimationFrame for immediate execution
      const scrollToHash = () => {
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
        } else {
          // If element not found yet, try again after a very short delay
          requestAnimationFrame(() => {
            setTimeout(scrollToHash, 50)
          })
        }
      }
      
      // Use requestAnimationFrame for instant execution on next paint
      requestAnimationFrame(() => {
        scrollToHash()
      })
    }
  }, [pathname])

  return null
}








