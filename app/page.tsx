"use client"
import Hero from "@/components/hero"
import About from "@/components/about"
import ProductGrid from "@/components/product-grid"
import CareGuides from "@/components/care-guides"
import Testimonials from "@/components/testimonials"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="w-full mx-auto" style={{ maxWidth: '100%', marginLeft: 'auto', marginRight: 'auto' }}>
      <Hero />
      <About />
      <ProductGrid />
      <CareGuides />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  )
}
