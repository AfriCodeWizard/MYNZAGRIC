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
  title: "MINZAGRIC - Premium Fruit Seedlings Global",
  description:
    "High-quality grafted fruit seedlings worldwide. Hass avocados, mangoes, citrus, and tropical fruits.",
  generator: "v0.app",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" },
    ],
    manifest: "/site.webmanifest",
  },
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
