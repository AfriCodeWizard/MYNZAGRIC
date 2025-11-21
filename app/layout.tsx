import type React from "react"
import type { Metadata } from "next"
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
  title: "Mynzagric - Premium Fruit Seedlings Kenya",
  description:
    "High-quality grafted and tissue-culture fruit seedlings for Kenya. Hass avocados, mangoes, citrus, and tropical fruits.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${acme.variable} ${satisfy.variable}`}>
      <body className={`${geist.className} antialiased`}>
        <CartProviderWrapper>
          {children}
          <Analytics />
        </CartProviderWrapper>
      </body>
    </html>
  )
}
