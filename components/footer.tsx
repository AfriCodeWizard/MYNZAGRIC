import { Facebook, Instagram, MessageCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-green-900 to-green-950 text-white py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block mb-4 hover:opacity-80 transition-opacity">
              <Image
                src="/mynzAgric-logoOficial-_1_.webp"
                alt="Mynzagric Logo"
                width={200}
                height={60}
                className="h-12 w-auto"
                priority={false}
                style={{ objectFit: 'contain' }}
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
                <a href="tel:+254700000000" className="hover:text-white transition">
                  +254 700 000 000
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
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-green-800 rounded-lg hover:bg-green-700 transition"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-green-800 rounded-lg hover:bg-green-700 transition"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/254700000000"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-green-800 rounded-lg hover:bg-green-700 transition"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-green-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-green-100 text-sm">© 2025 Mynzagric. All rights reserved.</p>
          <p className="text-green-100 text-sm font-semibold text-center md:text-right">
            Growing Kenya's Future, One Seedling at a Time
          </p>
        </div>
      </div>
    </footer>
  )
}
