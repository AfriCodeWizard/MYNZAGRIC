"use client"

import type React from "react"
import { useState } from "react"
import { Phone, Mail, MapPin } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const message = `Contact Form Submission:\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    window.open(`https://wa.me/254700000000?text=${encodeURIComponent(message)}`)
  }

  return (
    <>
      <section id="contact" className="py-20 md:py-28 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900">
              REACH US <span className="font-light text-gray-500">TO ORDER</span>
              <br />YOUR SEEDLINGS TODAY
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mt-4">
              Place your order via WhatsApp and pay securely using Lipa na M-Pesa upon order confirmation.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-[25px] shadow-[20px_22px_44px_rgba(0,0,0,0.1)] relative">
              <div className="grid md:grid-cols-12">
                {/* Left Column - Contact Form */}
                <div className="md:col-span-8">
                  <div className="p-12 md:p-16">
                    <div className="mb-8">
                      <h3 className="text-4xl font-semibold text-gray-900 mb-3">Contact Us</h3>
                      <p className="text-gray-600 text-sm">
                        Feel free to contact us any time. We will get back to you as soon as we can!
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-0 py-3 border-0 border-b border-gray-300 rounded-none focus:outline-none focus:ring-0 focus:border-b-2 focus:border-green-600 transition-colors"
                        placeholder="Name"
                      />

                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-0 py-3 border-0 border-b border-gray-300 rounded-none focus:outline-none focus:ring-0 focus:border-b-2 focus:border-green-600 transition-colors"
                        placeholder="Email"
                      />

                      <textarea
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-0 py-3 border-0 border-b border-gray-300 rounded-none focus:outline-none focus:ring-0 focus:border-b-2 focus:border-green-600 transition-colors resize-none"
                        placeholder="Message"
                      />

                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-5 rounded-[35px] cursor-pointer text-sm font-medium tracking-wider hover:from-green-700 hover:to-green-800 transition-all"
                      >
                        Send
                      </button>
                    </form>
                  </div>
                </div>

                {/* Right Column - Social Icons */}
                <div className="md:col-span-4 flex items-end">
                  <div className="w-full bg-gradient-to-br from-green-600 to-green-700 p-8 md:p-12 rounded-tl-[25px] rounded-bl-[25px] flex items-end">
                    <div className="flex gap-6 items-center justify-center w-full">
                      <a
                        href="https://wa.me/254700000000"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white text-xl hover:opacity-80 transition-opacity"
                        aria-label="WhatsApp"
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                        </svg>
                      </a>
                      <a
                        href="https://x.com/mynzagric"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white text-xl hover:opacity-80 transition-opacity"
                        aria-label="X (Twitter)"
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      </a>
                      <a
                        href="https://instagram.com/mynzagric"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white text-xl hover:opacity-80 transition-opacity"
                        aria-label="Instagram"
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      </a>
                      <a
                        href="https://tiktok.com/@mynzagric"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white text-xl hover:opacity-80 transition-opacity"
                        aria-label="TikTok"
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Info Section - Positioned absolutely on the right */}
              <div className="absolute right-0 top-[20%] bg-gray-800 w-[300px] p-10 rounded-l-[25px] hidden lg:block">
                <h4 className="text-white text-xl font-semibold mb-5">Contact Info</h4>
                <div className="space-y-5">
                  <div className="flex items-center text-white">
                    <svg className="w-5 h-5 mr-4 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    <span>+254 700 000 000</span>
                  </div>
                  <div className="flex items-center text-white">
                    <Mail className="w-5 h-5 mr-4 text-green-400 flex-shrink-0" />
                    <span>info@mynzagric.com</span>
                  </div>
                  <div className="flex items-center text-white">
                    <MapPin className="w-5 h-5 mr-4 text-green-400 flex-shrink-0" />
                    <span>Nairobi, Kenya</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h4 className="text-2xl font-semibold text-gray-900 mb-3">Find Us on Google Map</h4>
              <p className="text-gray-600">
                Visit our nursery location or contact us for delivery services across Kenya.
              </p>
            </div>
            <div className="rounded-[30px] overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7905!2d36.8219!3d-1.2921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMTcnMzEuNiJTIDM2wrA0OScxOC44IkU!5e0!3m2!1sen!2ske!4v1234567890"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
