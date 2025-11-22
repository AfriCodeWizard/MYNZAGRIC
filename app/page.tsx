"use client"
import { useEffect } from "react"
import Hero from "@/components/hero"
import About from "@/components/about"
import ProductGrid from "@/components/product-grid"
import FrutopiaValuePack from "@/components/frutopia-value-pack"
import CareGuides from "@/components/care-guides"
import Testimonials from "@/components/testimonials"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function Home() {
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

  return (
    <main className="w-full mx-auto" style={{ maxWidth: '100%', marginLeft: 'auto', marginRight: 'auto' }}>
      <Hero />
      <About />
      <ProductGrid />
      <FrutopiaValuePack />
      <CareGuides />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  )
}
