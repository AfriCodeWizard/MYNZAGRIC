"use client"

import { useState } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import Link from "next/link"
import { seedlings } from "@/lib/seedlings-data"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isCareGuidesOpen, setIsCareGuidesOpen] = useState(false)

  return (
    <header className="fixed top-0 z-50 w-full bg-gradient-to-b from-black/20 to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-white font-sans">
              MYNZAGRIC
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            <Link href="#about" className="text-white hover:text-green-200 transition uppercase text-sm font-medium">
              ABOUT
            </Link>
            <Link
              href="#seedlings"
              className="text-white hover:text-green-200 transition uppercase text-sm font-medium"
            >
              SEEDLINGS
            </Link>

            <div
              className="relative group"
              onMouseEnter={() => setIsCareGuidesOpen(true)}
              onMouseLeave={() => setIsCareGuidesOpen(false)}
            >
              <button className="text-white hover:text-green-200 transition uppercase text-sm font-medium flex items-center gap-2">
                CARE GUIDES
                <ChevronDown className="w-4 h-4" />
              </button>

              <div className="absolute left-0 mt-0 w-72 bg-white text-gray-900 rounded-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-4 max-h-96 overflow-y-auto z-50">
                <div className="grid grid-cols-2 gap-2 px-4">
                  {seedlings.map((seedling) => (
                    <Link
                      key={seedling.id}
                      href={`/plant-care/${seedling.id}`}
                      className="px-3 py-2 hover:bg-green-50 rounded-md text-sm font-medium text-gray-700 transition"
                    >
                      {seedling.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link href="#contact" className="text-white hover:text-green-200 transition uppercase text-sm font-medium">
              CONTACT
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center space-x-4"></div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-white"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden pb-4 space-y-2 bg-black/40">
            <Link
              href="#about"
              className="block px-3 py-2 text-white hover:text-green-200 uppercase text-sm font-medium"
            >
              ABOUT
            </Link>
            <Link
              href="#seedlings"
              className="block px-3 py-2 text-white hover:text-green-200 uppercase text-sm font-medium"
            >
              SEEDLINGS
            </Link>

            <button
              onClick={() => setIsCareGuidesOpen(!isCareGuidesOpen)}
              className="w-full text-left px-3 py-2 text-white hover:text-green-200 uppercase text-sm font-medium flex items-center justify-between"
            >
              CARE GUIDES
              <ChevronDown className={`w-4 h-4 transition ${isCareGuidesOpen ? "rotate-180" : ""}`} />
            </button>
            {isCareGuidesOpen && (
              <div className="pl-4 space-y-1 bg-black/20 rounded">
                {seedlings.map((seedling) => (
                  <Link
                    key={seedling.id}
                    href={`/plant-care/${seedling.id}`}
                    className="block px-3 py-1 text-sm text-green-200 hover:text-white transition"
                  >
                    {seedling.name}
                  </Link>
                ))}
              </div>
            )}

            <Link
              href="#contact"
              className="block px-3 py-2 text-white hover:text-green-200 uppercase text-sm font-medium"
            >
              CONTACT
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
