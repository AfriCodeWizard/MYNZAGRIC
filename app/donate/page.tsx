import type { Metadata } from 'next'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import DonateSection from '@/components/donation/donate-section'
import DonationMessage from '@/components/donation/donation-message'
import { BreadcrumbSchema } from '@/components/structured-data'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Donate - Partner with Us to Plant Hope | Mynzagric',
  description: 'Help us plant 100 grafted fruit seedlings in every school and hospital in Kenya. Fight malnutrition, promote sustainable agriculture, and transform communities.',
  keywords: 'donate, fruit seedlings, Kenya schools, hospitals, malnutrition, sustainable agriculture, grafted seedlings',
  openGraph: {
    title: 'Donate - Partner with Us to Plant Hope',
    description: 'Help us plant 100 grafted fruit seedlings in every school and hospital in Kenya',
    type: 'website',
  },
  alternates: {
    canonical: '/donate',
  },
}

export default function DonatePage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Donate', url: '/donate' }
      ]} />
      <div className="min-h-screen bg-[#07090d]">
        <Navbar />
        <Suspense fallback={null}>
          <DonationMessage />
        </Suspense>
        <DonateSection />
        <Footer />
      </div>
    </>
  )
}

