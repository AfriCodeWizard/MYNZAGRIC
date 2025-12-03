'use client'

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import Bubble from "./Bubble"

export default function Footer() {
  // Generate bubbles only on client side to avoid hydration mismatch
  const [bubbles, setBubbles] = useState<Array<{
    size: number
    left: number
    delay: number
    duration: number
  }>>([])

  useEffect(() => {
    // Generate bubbles with varying properties for natural animation
    setBubbles(
      Array.from({ length: 15 }).map(() => ({
        size: Math.random() * 40 + 20, // 20-60px
        left: Math.random() * 100, // 0-100%
        delay: Math.random() * 5, // 0-5s
        duration: Math.random() * 8 + 12, // 12-20s
      }))
    )
  }, [])

  return (
    <footer className="relative bg-gradient-to-b from-green-900 to-green-950 text-white py-16 md:py-20 overflow-hidden" style={{ zIndex: 1 }}>
      {/* Bubble Animation Layer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true" style={{ zIndex: 1 }}>
        {bubbles.map((bubble, index) => (
          <Bubble
            key={index}
            size={bubble.size}
            left={bubble.left}
            delay={bubble.delay}
            duration={bubble.duration}
          />
        ))}
      </div>

      {/* Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ zIndex: 1 }}>
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block mb-4 hover:opacity-80 transition-opacity">
              <Image
                src="/mynzAgric logoOficial (color).webp"
                alt="MINZAGRIC Logo"
                width={200}
                height={60}
                className="h-21 w-auto"
                priority={false}
                style={{ 
                  objectFit: 'contain',
                  backgroundColor: 'transparent',
                }}
              />
            </Link>
            <p className="text-green-100 text-sm leading-relaxed">
              Growing Kenya's future, one seedling at a time. Providing premium fruit seedlings to farmers across the
              nation since 2020.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3 text-green-100 text-sm">
              <li>
                <Link href="#about" className="hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#seedlings" className="hover:text-white transition">
                  Seedlings
                </Link>
              </li>
              <li>
                <Link href="#care" className="hover:text-white transition">
                  Care Guides
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold mb-6 text-white">Contact</h4>
            <ul className="space-y-3 text-green-100 text-sm">
              <li>
                <a href="tel:+254713764658" className="hover:text-white transition">
                  +254 713 764 658
                </a>
              </li>
              <li>
                <a href="mailto:info@mynzagric.com" className="hover:text-white transition">
                  info@mynzagric.com
                </a>
              </li>
              <li>Nairobi, Kenya</li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-bold mb-6 text-white">Follow Us</h4>
            <div className="flex gap-3">
              <a
                href="https://x.com/mynzagric254?t=wIbif2p_S4AI0GBH17nQBQ&s=09"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-green-800 rounded-lg hover:bg-green-700 transition"
                aria-label="X (Twitter)"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/mynzagric254?igsh=czJrdjBoYW5rYnl3"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-green-800 rounded-lg hover:bg-green-700 transition"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@mynzagricafrica?_r=1&_t=ZM-91Rcpl2IfPM"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-green-800 rounded-lg hover:bg-green-700 transition"
                aria-label="TikTok"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-green-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-green-100 text-sm">© 2025 MINZAGRIC. All rights reserved.</p>
          <p className="text-green-100 text-sm font-semibold text-center md:text-right">
            Growing Kenya's Future, One Seedling at a Time
          </p>
        </div>
      </div>
    </footer>
  )
}
