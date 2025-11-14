"use client"

import type React from "react"
import { useState } from "react"
import { MessageCircle, Phone, Mail } from "lucide-react"
import { seedlings } from "@/lib/seedlings-data"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    seedling: "",
    quantity: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const message = `Order Request:\n${formData.seedling} x${formData.quantity}\n\nCustomer: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}`
    window.open(`https://wa.me/254700000000?text=${encodeURIComponent(message)}`)
  }

  return (
    <section id="contact" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900">
            ORDER <span className="font-light text-gray-500">YOUR</span>
            <br />
            SEEDLINGS TODAY
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl">
            Get premium fruit seedlings delivered to your doorstep with expert guidance
          </p>
        </div>

        {/* Two-column layout matching Garden.JPG */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Column - Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                placeholder="+254 7XX XXX XXX"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Select Seedling</label>
              <select
                name="seedling"
                required
                value={formData.seedling}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              >
                <option value="">Choose a seedling...</option>
                {seedlings.slice(0, 10).map((s) => (
                  <option key={s.id} value={s.name}>
                    {s.name} - KES {s.price}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Quantity</label>
              <input
                type="number"
                name="quantity"
                required
                min="1"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                placeholder="Number of seedlings"
              />
            </div>
            <button
              type="submit"
              className="w-full px-8 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 transition font-semibold"
            >
              Submit Order via WhatsApp
            </button>
          </form>

          {/* Right Column - Contact Info Cards */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-xl border border-green-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Contact</h3>
              <p className="text-gray-700 mb-8">
                Pay securely via M-Pesa upon order confirmation. Instant support available on WhatsApp for all your
                agricultural needs.
              </p>

              <div className="space-y-4">
                <a
                  href="https://wa.me/254700000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-white rounded-lg hover:shadow-md transition border border-green-200"
                >
                  <MessageCircle className="w-6 h-6 text-green-700 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">WhatsApp</p>
                    <p className="text-sm text-gray-600">Chat with us instantly</p>
                  </div>
                </a>

                <a
                  href="tel:+254700000000"
                  className="flex items-center gap-4 p-4 bg-white rounded-lg hover:shadow-md transition border border-green-200"
                >
                  <Phone className="w-6 h-6 text-green-700 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Phone</p>
                    <p className="text-sm text-gray-600">+254 700 000 000</p>
                  </div>
                </a>

                <a
                  href="mailto:info@mynzagric.com"
                  className="flex items-center gap-4 p-4 bg-white rounded-lg hover:shadow-md transition border border-green-200"
                >
                  <Mail className="w-6 h-6 text-green-700 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Email</p>
                    <p className="text-sm text-gray-600">info@mynzagric.com</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
