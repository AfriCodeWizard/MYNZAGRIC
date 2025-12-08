import { createFeatureFlag } from "../flags"
import Hero from "@/components/hero"
import About from "@/components/about"
import ProductGrid from "@/components/product-grid"
import FrutopiaValuePack from "@/components/frutopia-value-pack"
import CareGuides from "@/components/care-guides"
import Testimonials from "@/components/testimonials"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import HashNavigation from "@/components/hash-navigation"

export default async function Home() {
  // Safely get feature flag, default to false if error
  let enabled = false
  try {
    enabled = await createFeatureFlag("my_feature_flag")()
  } catch (error) {
    // Feature flag not configured or Statsig key missing - default to false
    console.warn("Feature flag evaluation failed, defaulting to false:", error)
    enabled = false
  }

  return (
    <main className="w-full mx-auto" style={{ maxWidth: '100%', marginLeft: 'auto', marginRight: 'auto' }}>
      <HashNavigation />
      {enabled && (
        <div className="p-4 bg-blue-100 text-blue-800 text-center">
          myFeatureFlag is on
        </div>
      )}
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
