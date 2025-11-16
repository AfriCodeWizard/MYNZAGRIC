"use client"

export default function Testimonials() {
  const testimonials = [
    {
      name: "Samuel Kipchoge",
      text: "Mynzagric seedlings have transformed my farm. The quality is unmatched and they really care about your success.",
    },
    {
      name: "Grace Mwangi",
      text: "The care guides are incredibly detailed. I got a 95% survival rate with the Hass avocados. Highly recommend!",
    },
    {
      name: "David Ochieng",
      text: "Been ordering from Mynzagric for 3 years. Consistent quality, great support. They are the real deal.",
    },
    {
      name: "Jane Kamau",
      text: "Excellent seedlings and amazing customer service. My mango orchard is thriving thanks to Mynzagric!",
    },
    {
      name: "Peter Muthoni",
      text: "The citrus varieties I got are producing exceptional fruits. Best investment I've made in my farm!",
    },
    {
      name: "Mary Wanjiru",
      text: "Fast delivery and healthy seedlings. My berry garden is flourishing with their quality plants.",
    },
    {
      name: "James Otieno",
      text: "Professional service from start to finish. The grafted mangoes are showing amazing growth results.",
    },
    {
      name: "Sarah Njeri",
      text: "Outstanding customer support and premium quality seedlings. My avocado farm has never been better!",
    },
    {
      name: "Michael Kariuki",
      text: "Trusted supplier for all my farming needs. Their seedlings consistently outperform expectations.",
    },
    {
      name: "Anne Mwende",
      text: "Top-notch quality and excellent care instructions. Highly recommend for serious farmers!",
    },
    {
      name: "Paul Njoroge",
      text: "The tissue-cultured seedlings are exceptional. Quick establishment and vigorous growth.",
    },
    {
      name: "Ruth Akinyi",
      text: "Reliable delivery and exceptional seedling quality. My fruit farm is now a thriving business!",
    },
  ]

  // Duplicate testimonials for seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials]

  return (
    <section id="testimonials" className="relative overflow-hidden py-20 md:py-28 bg-[#0e0e0e] testimonials">
      {/* Section Heading */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative z-10">
        <h2 className="text-5xl md:text-6xl font-bold text-white">
          CUSTOMER <span className="font-light text-gray-400">SUCCESS</span>
          <br />& STORIES
        </h2>
        <p className="text-lg text-gray-300 max-w-2xl mt-4">
          Join hundreds of Kenyan farmers achieving remarkable harvests with Mynzagric
        </p>
      </div>

      {/* Gradient overlays for fade effect - positioned only around testimonial cards, well below navbar and heading */}
      <div className="absolute left-0 top-[350px] md:top-[400px] w-48 bottom-0 bg-gradient-to-r from-[#0e0e0e] to-transparent z-0 pointer-events-none" />
      <div className="absolute right-0 top-[350px] md:top-[400px] w-48 bottom-0 bg-gradient-to-l from-[#0e0e0e] to-transparent z-0 pointer-events-none" />

      <div className="testimonial-slide flex w-max" style={{ animationPlayState: 'running' }}>
        {duplicatedTestimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white/8 text-white backdrop-blur-md rounded-xl p-5 mx-5 w-[280px] flex-shrink-0 shadow-[0_0_12px_rgba(34,197,94,0.15)] transition-transform duration-300 hover:-translate-y-1"
          >
            <p className="text-[15px] leading-[1.4] mb-2.5">
              "{testimonial.text}"
            </p>
            <h4 className="text-sm font-semibold text-green-400 m-0">
              {testimonial.name}
            </h4>
          </div>
        ))}
      </div>
    </section>
  )
}
