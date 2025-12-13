import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono, Acme, Satisfy } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import CartProviderWrapper from "@/components/cart-provider-wrapper"
import "./globals.css"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
})

const acme = Acme({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-acme",
  display: "swap",
})

const satisfy = Satisfy({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-satisfy",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://mynzagric.com'),
  title: {
    default: "Mynzagric - Premium Grafted Fruit Seedlings & Irrigation Systems | Kenya",
    template: "%s | Mynzagric"
  },
  description:
    "Buy premium grafted fruit seedlings including Hass avocados, mangoes, citrus, and tropical fruits. Complete 1-acre value packs with drip irrigation systems. Professional agronomical support included.",
  keywords: ["grafted fruit seedlings", "mango seedlings", "avocado seedlings", "citrus seedlings", "drip irrigation", "fruit farming Kenya", "premium seedlings", "Hass avocado", "Tommy mango", "Valencia orange"],
  authors: [{ name: "Mynzagric" }],
  creator: "Mynzagric",
  publisher: "Mynzagric",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  generator: "Next.js",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "/",
    siteName: "Mynzagric",
    title: "Mynzagric - Premium Grafted Fruit Seedlings & Irrigation Systems",
    description: "High-quality grafted fruit seedlings worldwide. Hass avocados, mangoes, citrus, and tropical fruits with professional irrigation systems.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mynzagric - Premium Grafted Fruit Seedlings",
    description: "High-quality grafted fruit seedlings worldwide. Hass avocados, mangoes, citrus, and tropical fruits.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${acme.variable} ${satisfy.variable}`}>
      <body className={`${geist.className} antialiased`} suppressHydrationWarning>
        <CartProviderWrapper>
          {children}
          <Analytics />
        </CartProviderWrapper>
      </body>
    </html>
  )
}
