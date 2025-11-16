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

      {/* Container for testimonial slide with fade overlays aligned to section margins */}
      <div className="relative overflow-hidden">
        {/* Left fade overlay - aligned with section margin */}
        <div className="absolute left-4 sm:left-6 lg:left-8 top-0 bottom-0 w-48 z-10 pointer-events-none">
          <div className="h-full bg-gradient-to-r from-[#0e0e0e] via-[#0e0e0e]/90 to-transparent shadow-[inset_40px_0_30px_-30px_rgba(14,14,14,0.9)]" />
        </div>
        
        {/* Right fade overlay - aligned with section margin */}
        <div className="absolute right-4 sm:right-6 lg:right-8 top-0 bottom-0 w-48 z-10 pointer-events-none">
          <div className="h-full bg-gradient-to-l from-[#0e0e0e] via-[#0e0e0e]/90 to-transparent shadow-[inset_-40px_0_30px_-30px_rgba(14,14,14,0.9)]" />
        </div>

        <div className="testimonial-slide flex w-max relative z-0" style={{ animationPlayState: 'running' }}>
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
      </div>
    </section>
  )
}
