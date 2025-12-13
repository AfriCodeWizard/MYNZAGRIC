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
import type { Metadata } from "next"
import { OrganizationSchema, WebsiteSchema } from "@/components/structured-data"

export const metadata: Metadata = {
  title: "Mynzagric - Premium Grafted Fruit Seedlings & Irrigation Systems | Kenya",
  description: "Buy premium grafted fruit seedlings including Hass avocados, mangoes, citrus, and tropical fruits. Complete 1-acre value packs with drip irrigation systems. Professional agronomical support included. Transform your farm today!",
  keywords: "grafted fruit seedlings, mango seedlings, avocado seedlings, citrus seedlings, drip irrigation, fruit farming Kenya, premium seedlings, Hass avocado, Tommy mango, Valencia orange, Pixie orange, fruit tree nursery",
  openGraph: {
    title: "Mynzagric - Premium Grafted Fruit Seedlings & Irrigation Systems",
    description: "High-quality grafted fruit seedlings worldwide. Hass avocados, mangoes, citrus, and tropical fruits with professional irrigation systems.",
    type: "website",
    locale: "en_KE",
    siteName: "Mynzagric",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mynzagric - Premium Grafted Fruit Seedlings",
    description: "High-quality grafted fruit seedlings worldwide. Hass avocados, mangoes, citrus, and tropical fruits.",
  },
  alternates: {
    canonical: "/",
  },
}

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
      <OrganizationSchema />
      <WebsiteSchema />
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
