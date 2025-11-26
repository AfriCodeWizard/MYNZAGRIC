"use client"

export default function Testimonials() {
  const testimonials = [
    {
      name: "Grace Wanjiru",
      text: "Mynzagric seedlings have transformed my farm. The quality is unmatched and they really care about your success.",
    },
    {
      name: "Fred Onyango",
      text: "The care guides are incredibly detailed. I got a 95% survival rate with the Hass avocados. Highly recommend!",
    },
    {
      name: "Rabala James",
      text: "Been ordering from Mynzagric for 3 years. Consistent quality, great support. They are the real deal.",
    },
    {
      name: "James Kariuki",
      text: "Excellent seedlings and amazing customer service. My mango orchard is thriving thanks to Mynzagric!",
    },
    {
      name: "Hiroshi Tanaka",
      text: "The citrus varieties I got are producing exceptional fruits. Best investment I've made in my farm!",
    },
    {
      name: "Amina Okafor",
      text: "Fast delivery and healthy seedlings. My berry garden is flourishing with their quality plants.",
    },
    {
      name: "David Chen",
      text: "Professional service from start to finish. The grafted mangoes are showing amazing growth results.",
    },
    {
      name: "Sofia Rodriguez",
      text: "Outstanding customer support and premium quality seedlings. My avocado farm has never been better!",
    },
    {
      name: "Kwame Asante",
      text: "Trusted supplier for all my farming needs. Their seedlings consistently outperform expectations.",
    },
    {
      name: "Mei Lin",
      text: "Top-notch quality and excellent care instructions. Highly recommend for serious farmers!",
    },
    {
      name: "Diego Silva",
      text: "The tissue-cultured seedlings are exceptional. Quick establishment and vigorous growth.",
    },
    {
      name: "Fatima Al-Mansouri",
      text: "Reliable delivery and exceptional seedling quality. My fruit farm is now a thriving business!",
    },
  ]

  // Duplicate testimonials for seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials]

  return (
    <section id="testimonials" className="relative overflow-hidden py-20 md:py-28 bg-[#0e0e0e] testimonials">
      {/* Section Heading - must be below navbar z-50 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16 relative" style={{ zIndex: 1 }}>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white" style={{ zIndex: 1, position: 'relative' }}>
          CUSTOMER <span className="font-light text-green-400">SUCCESS</span>
          <br />& STORIES
        </h2>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mt-3 sm:mt-4" style={{ zIndex: 1, position: 'relative' }}>
          Join hundreds of farmers worldwide achieving remarkable harvests with Mynzagric
        </p>
      </div>

      {/* Container for testimonial slide with fade overlays aligned to section margins */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ overflow: 'hidden', clipPath: 'inset(0)' }}>
        {/* Left fade overlay - fully opaque to hide cards completely */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 md:w-56 z-20 pointer-events-none">
          <div className="h-full bg-gradient-to-r from-[#0e0e0e] via-[#0e0e0e] to-transparent" />
        </div>
        
        {/* Right fade overlay - fully opaque to hide cards completely */}
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 md:w-56 z-20 pointer-events-none">
          <div className="h-full bg-gradient-to-l from-[#0e0e0e] via-[#0e0e0e] to-transparent" />
        </div>

        {/* Additional solid mask overlays for stronger fade at edges */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 md:w-32 z-30 pointer-events-none">
          <div className="h-full bg-[#0e0e0e]" />
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 md:w-32 z-30 pointer-events-none">
          <div className="h-full bg-[#0e0e0e]" />
        </div>

        <div className="testimonial-slide flex w-max relative z-10" style={{ animationPlayState: 'running' }}>
        {duplicatedTestimonials.map((testimonial, index) => (
          <div
            key={index}
            className="testimonial-card bg-white/8 text-white backdrop-blur-md rounded-xl p-4 sm:p-5 mx-3 sm:mx-5 w-[240px] sm:w-[260px] md:w-[280px] flex-shrink-0 shadow-[0_0_12px_rgba(34,197,94,0.15)] transition-transform duration-300 hover:-translate-y-1"
          >
            <p className="text-sm sm:text-[15px] leading-[1.4] mb-2 sm:mb-2.5">
              "{testimonial.text}"
            </p>
            <h4 className="text-xs sm:text-sm font-semibold text-green-400 m-0">
              {testimonial.name}
          </h4>
        </div>
      ))}
        </div>
      </div>
    </section>
  )
}
