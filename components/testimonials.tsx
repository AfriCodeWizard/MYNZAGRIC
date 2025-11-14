export default function Testimonials() {
  const testimonials = [
    {
      name: "Samuel Kipchoge",
      role: "Farm Owner, Uasin Gishu",
      text: "Mynzagric seedlings have transformed my farm. The quality is unmatched and they really care about your success.",
      image: "👨‍🌾",
    },
    {
      name: "Grace Mwangi",
      role: "Horticulturist, Kiambu",
      text: "The care guides are incredibly detailed. I got a 95% survival rate with the Hass avocados. Highly recommend!",
      image: "👩‍🌾",
    },
    {
      name: "David Ochieng",
      role: "Fruit Exporter, Nakuru",
      text: "Been ordering from Mynzagric for 3 years. Consistent quality, great support. They are the real deal.",
      image: "👨‍💼",
    },
  ]

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900">
            CUSTOMER <span className="font-light text-gray-500">SUCCESS</span>
            <br />
            STORIES
          </h2>
          <p className="text-lg text-gray-600">
            Join hundreds of Kenyan farmers achieving remarkable harvests with Mynzagric
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-xl border border-green-100 hover:shadow-lg transition">
              <div className="text-5xl mb-4">{testimonial.image}</div>
              <p className="text-gray-700 mb-6 italic leading-relaxed">"{testimonial.text}"</p>
              <div>
                <p className="font-bold text-gray-900">{testimonial.name}</p>
                <p className="text-gray-600 text-sm">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
